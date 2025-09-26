export enum ModalTypeEnum  {
    ADD = "ADD",
    EDIT = "EDIT",
    DELETE = "DELETE",
    CANCEL = "CANCEL",
    COPY ='COPY'
}

export type ModalType = ModalTypeEnum.ADD | ModalTypeEnum.EDIT | ModalTypeEnum.CANCEL | ModalTypeEnum.DELETE | ModalTypeEnum.COPY;