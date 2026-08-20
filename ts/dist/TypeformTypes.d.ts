export interface Form {
    created_at?: string;
    fields?: any[];
    id?: string;
    last_updated_at?: string;
    links?: Record<string, any>;
    published_at?: string;
    settings?: Record<string, any>;
    theme?: Record<string, any>;
    title?: string;
    type?: string;
    workspace?: Record<string, any>;
}
export interface FormLoadMatch {
    id: string;
}
export interface FormListMatch {
    created_at?: string;
    fields?: any[];
    id?: string;
    last_updated_at?: string;
    links?: Record<string, any>;
    published_at?: string;
    settings?: Record<string, any>;
    theme?: Record<string, any>;
    title?: string;
    type?: string;
    workspace?: Record<string, any>;
}
export interface FormCreateData {
    created_at?: string;
    fields?: any[];
    id?: string;
    last_updated_at?: string;
    links?: Record<string, any>;
    published_at?: string;
    settings?: Record<string, any>;
    theme?: Record<string, any>;
    title?: string;
    type?: string;
    workspace?: Record<string, any>;
}
export interface FormUpdateData {
    id: string;
    created_at?: string;
    fields?: any[];
    last_updated_at?: string;
    links?: Record<string, any>;
    published_at?: string;
    settings?: Record<string, any>;
    theme?: Record<string, any>;
    title?: string;
    type?: string;
    workspace?: Record<string, any>;
}
export interface FormRemoveMatch {
    id: string;
}
