import { TypeformEntityBase } from '../TypeformEntityBase';
import type { TypeformSDK } from '../TypeformSDK';
import type { Control } from '../types';
import type { Form, FormLoadMatch, FormListMatch, FormCreateData, FormUpdateData, FormRemoveMatch } from '../TypeformTypes';
declare class FormEntity extends TypeformEntityBase<Form> {
    constructor(client: TypeformSDK, entopts: any);
    make(this: FormEntity): FormEntity;
    load(this: any, reqmatch?: FormLoadMatch, ctrl?: Control): Promise<FormEntity>;
    list(this: any, reqmatch?: FormListMatch, ctrl?: Control): Promise<FormEntity[]>;
    create(this: any, reqdata?: FormCreateData, ctrl?: Control): Promise<FormEntity>;
    update(this: any, reqdata?: FormUpdateData, ctrl?: Control): Promise<FormEntity>;
    remove(this: any, reqmatch?: FormRemoveMatch, ctrl?: Control): Promise<FormEntity>;
}
export { FormEntity };
