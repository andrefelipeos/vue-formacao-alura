export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    ATENCAO
}

export interface NotificacaoInterface {
    id: number;
    tipo: TipoNotificacao;
    mensagem: string;
}