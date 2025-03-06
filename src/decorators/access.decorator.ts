import { Reflector } from '@nestjs/core';

export enum AccessTypes {
    PUBLIC,
    RESTRICTED,
    ADMIN,
}

export const Access = Reflector.createDecorator<AccessTypes>();