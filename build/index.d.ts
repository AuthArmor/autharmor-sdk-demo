declare type Events = "authenticating" | "authenticated" | "inviteWindowOpened" | "inviteWindowClosed" | "popupOverlayOpened" | "popupOverlayClosed" | "inviteAccepted" | "inviteDeclined" | "inviteExists" | "inviteCancelled" | "registerSuccess" | "error";
declare type AuthTypes = "magiclink" | "push" | "usernameless" | "webauthn";
declare type AuthMethods = "authenticator" | "magiclink" | "webauthn";
declare type EventListener = (...data: any) => void | Promise<void>;
interface InviteNicknameOptions {
    nickname: string;
    headers?: Record<string, string>;
}
interface InviteIdOptions {
    id: string;
    headers?: Record<string, string>;
}
interface InviteOptions {
    nickname: string;
    referenceId?: string;
    reset?: boolean;
    headers?: Record<string, string>;
}
interface InviteData {
    inviteCode: string;
    signature: string;
}
interface AuthenticateResponseSuccess {
    response: any;
    nickname: string;
    token: string;
    authorized: true;
    status: "Success" | "Timeout" | "Declined";
    metadata?: any;
}
interface AuthenticateResponseFail {
    response: any;
    nickname: string;
    authorized: false;
    status: "Success" | "Timeout" | "Declined";
    metadata?: any;
}
interface LocationData {
    latitude: string;
    longitude: string;
}
interface AuthenticateArgs {
    nickname: string;
    sendPush: boolean;
    actionName: string;
    shortMessage: string;
    visualVerify: boolean;
    showPopup: boolean;
    headers?: Record<string, string>;
    qrCodeStyle: {
        borderRadius: number;
        background: string;
        foreground: string;
    };
    locationData: LocationData;
    onSuccess: (data: AuthenticateResponseSuccess) => any;
    onFailure: (data: AuthenticateResponseFail) => any;
}
interface FormStyles {
    accentColor: string;
    backgroundColor: string;
    tabColor: string;
    activeTabColor: string;
    qrCodeBackground: string;
}
interface FormMountOptions {
    methods?: AuthMethods[];
    usernameless?: boolean;
    styles?: Partial<FormStyles>;
}
declare global {
    interface Window {
        AuthArmorSDK: any;
        AuthArmor: any;
    }
    interface Crypto {
        randomUUID: () => string;
    }
}
declare class SDK {
    private url;
    private publicKey?;
    private webauthnClientId?;
    private webauthn?;
    private events;
    private eventListeners;
    private tickTimerId?;
    private requestCompleted;
    private pollInterval;
    private expirationDate;
    private pollTimerId?;
    private QRAnimationTimer?;
    private hasCalledValidate;
    private registerRedirectUrl?;
    private authenticationRedirectUrl?;
    private debug;
    constructor({ endpointBasePath, publicKey, webauthnClientId, registerRedirectUrl, authenticationRedirectUrl, debug }: {
        endpointBasePath?: string | undefined;
        publicKey?: string | undefined;
        webauthnClientId?: string | undefined;
        registerRedirectUrl?: string | undefined;
        authenticationRedirectUrl?: string | undefined;
        debug?: {
            url: string;
        } | undefined;
    });
    private processUrl;
    private ensureEventExists;
    private popupWindow;
    private showPopup;
    private hidePopup;
    private updateMessage;
    private executeEvent;
    private showPopupQRCode;
    private hidePopupQRCode;
    private init;
    private selectTab;
    private closeModal;
    private padTime;
    private tickTimer;
    private bytesToHex;
    private sha256;
    private hmac;
    private getRequestSignature;
    private fetch;
    private getEnrollmentStatus;
    private getRequestStatus;
    registerAuthenticator: (username: string) => Promise<void>;
    registerMagicLink: (username: string) => Promise<void>;
    registerWebAuthn: (username: string) => Promise<void>;
    loginWebAuthn: (username: string) => Promise<void>;
    requestAuth: (type: AuthTypes, username?: string | undefined) => Promise<void>;
    private selectAuthMethod;
    setCardText: (messages: Record<string, string>) => void;
    mount: (selector?: string, options?: FormMountOptions) => void;
    setStyle: (styles: FormStyles) => void;
    on(eventName: Events, fn: EventListener): void;
    off(eventName: Events): void;
    private setInviteData;
    private generateInviteCode;
    private getInviteById;
    private getInvitesByNickname;
    private logout;
    private onAuthResponse;
    private pollAuthRequest;
    private authenticate;
    private getUser;
    get invite(): {
        generateInviteCode: ({ nickname, headers, referenceId, reset }: InviteOptions) => Promise<any>;
        setInviteData: ({ inviteCode, signature }: InviteData) => {
            getQRCode: ({ backgroundColor, fillColor, borderRadius }?: {
                backgroundColor?: string | undefined;
                fillColor?: string | undefined;
                borderRadius?: number | undefined;
            }) => any;
            getInviteLink: () => string;
            openInviteLink: () => void;
        };
        getInviteById: ({ id, headers }: InviteIdOptions) => Promise<any>;
        getInvitesByNickname: ({ nickname, headers }: InviteNicknameOptions) => Promise<any>;
    };
    get auth(): {
        authenticate: ({ nickname, sendPush, visualVerify, showPopup, actionName, shortMessage, locationData, headers, onSuccess, onFailure }: AuthenticateArgs) => Promise<{
            getTimeLeft: () => number;
            getQRCode: ({ backgroundColor, fillColor, borderRadius }?: {
                backgroundColor?: string | undefined;
                fillColor?: string | undefined;
                borderRadius?: number | undefined;
            }) => any;
            auth_request_id: string;
            auth_profile_id: string;
            visual_verify_value: string;
            response_code: number;
            response_message: string;
            qr_code_data: string;
            push_message_sent: boolean;
            timeout_in_seconds: number;
            timeout_utc_datetime: string;
        }>;
        getUser: () => Promise<any>;
        logout: () => Promise<any>;
    };
    get popup(): {
        show: (message?: string, hideQRBtn?: boolean | undefined) => void;
        hide: (delay?: number) => void;
        updateMessage: (message: string, status?: string) => void;
    };
    get form(): {
        mount: (selector?: string, options?: FormMountOptions) => void;
        stylize: (styles: FormStyles) => void;
    };
}
export default SDK;
