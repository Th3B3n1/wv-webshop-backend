import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, MoreThan, Repository } from 'typeorm';
import { Tokens } from '../entities/tokens.entity';
import { Cart } from 'src/endpoints/cart/entities/cart.entity';
import { Users } from 'src/endpoints/users/entities/users.entity';

@Injectable()
export class SecretService {
    constructor(@InjectRepository(Tokens) private readonly tokensRepository: Repository<Tokens>) { }

    async getToken(user: Users): Promise<{ token: string, expiresAt: Date }> {
        let tokens: Tokens[] = await this.tokensRepository.find({
            where: {
                user: {
                    id: user.id,
                },
                expiresAt: MoreThan(new Date()),
            }
        });
        if (tokens.length > 0) {
            return tokens[0];
        }
        let token: Tokens = await this.tokensRepository.save({
            user: {
                id: user.id,
            },
            token: crypto.randomUUID(),
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        });
        return token;
    }

    async seamlessAuth(token: string): Promise<{ id: number, email: string, username: string, carts: Cart[], isAdmin: boolean }> {
        let query: {
            user: {
                id: number,
                email: string,
                username: string,
                carts: Cart[],
                isAdmin: boolean,
            }
        } = await this.tokensRepository.findOneOrFail({
            relations: ['user'],
            select: {
                user: {
                    id: true,
                    email: true,
                    username: true,
                    carts: true,
                    isAdmin: true,
                },
            },
            where: {
                token: token,
                expiresAt: MoreThan(new Date()),
            }
        }).catch((e) => {
            if (e instanceof EntityNotFoundError) {
                throw new ForbiddenException('You do not have permission to access this resource');
            }
            throw e;
        });
        return {
            id: query.user.id,
            email: query.user.email,
            username: query.user.username,
            carts: query.user.carts,
            isAdmin: query.user.isAdmin,
        }
    }

    async isAdmin(token: string): Promise<boolean> {
        let query: {
            id: number,
            email: string,
            username: string,
            carts: Cart[],
            isAdmin: boolean,
        } = await this.seamlessAuth(token);
        return query.isAdmin;
    }
}
