import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from 'express';
import { SecretService } from "src/auth/secret/secret.service";
import { Access, AccessTypes } from "src/decorators/access.decorator";
import { Cart } from "src/endpoints/cart/entities/cart.entity";

@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly secretService: SecretService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let access: AccessTypes = this.reflector.get<AccessTypes>(Access, context.getHandler());
        if (!access) {
            return true;
        }
        let request = context.switchToHttp().getRequest();
        let token: string | undefined = this.extractTokenFromHeader(request);
        if (!token)
        {
            throw new UnauthorizedException();
        }
        switch (access) {
            case AccessTypes.RESTRICTED:
                let response: {id: number, email: string, username: string, carts: Cart[]} = await this.secretService.seamlessAuth(token);
                request['user'] = response;
                return true;
            case AccessTypes.ADMIN:
                return await this.secretService.isAdmin(token);
            default:
                return false;
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}