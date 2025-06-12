import { AdminRole } from 'src/shared/enum/admin.enum';
export declare const Auth: (...roles: AdminRole[]) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
