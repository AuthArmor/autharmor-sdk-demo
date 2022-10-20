/// <reference types="node" />
declare type Events = "authenticating" | "authSuccess" | "authTimeout" | "authDeclined" | "inviteWindowOpened" | "inviteWindowClosed" | "popupOverlayOpened" | "popupOverlayClosed" | "inviteAccepted" | "inviteDeclined" | "inviteExists" | "inviteCancelled" | "registerSuccess" | "error";
declare type AuthTypes = "magiclink-email" | "push" | "usernameless" | "webauthn";
export declare type AuthMethods = "authenticator" | "magiclink-email" | "webauthn";
declare type EventListener = (...data: any) => void | Promise<void>;
interface LocationData {
    latitude: string;
    longitude: string;
}
export interface FormStyles {
    accentColor: string;
    backgroundColor: string;
    tabColor: string;
    qrCodeBackground: string;
    highlightColor: string;
    inputBackground: string;
    appBtn: string;
}
interface Preferences {
    action_name: string;
    username: string;
    custom_message: string;
    short_msg: string;
    timeout_in_seconds: number;
    context_data: {
        [x: string]: string;
    };
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
export interface FormPreferences {
    register: FormAuthTypePreferences;
    auth: FormAuthTypePreferences;
}
interface FormMountOptions {
    methods?: AuthMethods[];
    usernameless?: boolean;
    preferences?: Partial<FormPreferences>;
    styles?: Partial<FormStyles>;
    defaultTab?: "login" | "register";
    visualVerify?: boolean;
}
interface DebugSettings {
    url: string;
}
interface SDKConfig {
    clientSdkApiKey: string;
    webauthnClientId: string;
    registerRedirectUrl: string;
    authenticationRedirectUrl: string;
    getNonce?: () => string;
    debug?: DebugSettings;
}
declare global {
    interface Window {
        AuthArmorSDK?: typeof SDK;
        AuthArmor: any;
    }
}
declare class SDK {
    private publicKey?;
    private webauthnClientId?;
    private webauthn?;
    private events;
    private eventListeners;
    private tickTimerId?;
    private requestCompleted;
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
    private getNonce?;
    private visualVerify?;
    private tempRequests;
    private debug;
    textTimer?: NodeJS.Timer;
    textFadeTimer?: NodeJS.Timer;
    textIndex: number;
    loadingText: string[];
    constructor({ clientSdkApiKey, webauthnClientId, registerRedirectUrl, authenticationRedirectUrl, getNonce, debug }: SDKConfig);
    private processUrl;
    private ensureEventExists;
    private popupWindow;
    private closePopupListener;
    private showQRCodeListener;
    private showPopup;
    private hidePopup;
    private updateMessage;
    private executeEvent;
    private hideLoading;
    private showLoading;
    private swapLoadingText;
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
    private clearRequests;
    private getRequestStatus;
    registerAuthenticator: (username: string) => Promise<void>;
    registerMagicLink: (username: string) => Promise<void>;
    registerWebAuthn: (username: string) => Promise<void>;
    loginWebAuthn: (username: string) => Promise<void>;
    private getRecaptchaToken;
    onLinkClick: (e: MouseEvent) => void;
    requestAuth: (type: AuthTypes, options?: Partial<Preferences> | undefined) => Promise<void>;
    private selectAuthMethod;
    setCardText: (messages: Record<string, string>, enrolledMethods?: Record<string, any> | undefined) => void;
    mount: (selector?: string, options?: FormMountOptions) => Promise<void>;
    getPopupMessage: (method: any) => string | undefined;
    processLink: (link: string, customScheme: boolean) => string;
    setStyle: (styles: FormStyles) => void;
    on(eventName: Events, fn: EventListener): void;
    off(eventName: Events): void;
    getUserEnrollments: ({ username }: {
        username: string;
    }) => Promise<any>;
    private authenticate;
    destroy: () => void;
    get auth(): {
        authenticate: (options?: Partial<Preferences> | undefined) => Promise<void>;
    };
    get popup(): {
        show: (message?: string, hideQRBtn?: boolean | undefined) => void;
        hide: (delay?: number) => void;
        updateMessage: (message: string, status?: "danger" | "warn" | "success") => void;
    };
    get form(): {
        mount: (selector?: string, options?: FormMountOptions) => Promise<void>;
        stylize: (styles: FormStyles) => void;
    };
}
export default SDK;
