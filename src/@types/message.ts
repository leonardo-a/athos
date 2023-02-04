import { Id } from "venom-bot";

export interface iListResponseSelected {
    $$unknownFieldCount: number;
    selectedRowId: string;
}

export interface iListResponse {
    $$unknownFieldCount: number;
    title: string;
    listType: number;
    singleSelectReply: iListResponseSelected;
    description: string;
}

export interface iMessageObj {
    id: Id;
    body: string;
    from: string;
    to: string;
    fromMe: string;
    type: string;
    subtype: string;
    isGroupMsg: boolean;
    listResponse?: iListResponse;
}