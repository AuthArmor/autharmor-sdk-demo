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
interface LocationData {
    latitude: string;
    longitude: string;
}
interface FormStyles {
    accentColor: string;
    backgroundColor: string;
    tabColor: string;
    activeTabColor: string;
    qrCodeBackground: string;
}
interface Preferences {
    action_name: string;
    username: string;
    short_msg: string;
    timeout_in_seconds: number;
    origin_location_data: LocationData;
}
interface AuthenticatorPreferences extends Preferences {
    send_push: boolean;
}
interface FormAuthTypePreferences {
    default?: Partial<AuthenticatorPreferences>;
    authenticator?: Partial<AuthenticatorPreferences>;
    magicLink?: Partial<Preferences>;
    webauthn?: Partial<Preferences>;
}
interface FormPreferences {
    register: FormAuthTypePreferences;
    login: FormAuthTypePreferences;
}
interface FormMountOptions {
    methods?: AuthMethods[];
    usernameless?: boolean;
    preferences?: Partial<FormPreferences>;
    styles?: Partial<FormStyles>;
}
declare global {
    interface Window {
        AuthArmorSDK: any;
        AuthArmor: any;
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
    private preferences?;
    private recaptcha?;
    private recaptchaSiteKey;
    private customOptions?;
    private debug;
    constructor({ endpointBasePath, clientSdkApiKey, webauthnClientId, registerRedirectUrl, authenticationRedirectUrl, debug }: {
        endpointBasePath?: string | undefined;
        clientSdkApiKey?: string | undefined;
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
    private hideLoading;
    private showLoading;
    private showPopupQRCode;
    private hidePopupQRCode;
    private getSDKConfig;
    private init;
    private updateModalText;
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
    private getRecaptchaToken;
    requestAuth: (type: AuthTypes, options?: Partial<Preferences> | undefined) => Promise<void>;
    private selectAuthMethod;
    setCardText: (messages: Record<string, string>, enrolledMethods?: Record<string, any> | undefined) => void;
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
    getUserEnrollments: ({ username }: {
        username: string;
    }) => Promise<any>;
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
        authenticate: (options?: Partial<Preferences> | undefined) => Promise<void>;
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
