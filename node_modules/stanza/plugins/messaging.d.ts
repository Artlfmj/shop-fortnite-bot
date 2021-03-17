import { Agent } from '../';
import { CarbonMessage, DataForm, Message, MessageReceipt, ReceivedMessage, RTT } from '../protocol';
declare module '../' {
    interface Agent {
        getAttention(jid: string, opts?: Partial<Message>): void;
        enableCarbons(): Promise<void>;
        disableCarbons(): Promise<void>;
        markReceived(msg: Message): void;
        markDisplayed(msg: Message): void;
        markAcknowledged(msg: Message): void;
    }
    interface AgentConfig {
        /**
         * Send Chat Markers
         *
         * When enabled, message display markers will automatically be sent when requested.
         *
         * @default true
         */
        chatMarkers?: boolean;
        /**
         * Send Message Delivery Receipts
         *
         * When enabled, message receipts will automatically be sent when requested.
         *
         * @default true
         */
        sendReceipts?: boolean;
    }
    interface AgentEvents {
        attention: ReceivedMessage;
        'carbon:received': ReceivedCarbon;
        'carbon:sent': SentCarbon;
        'chat:state': ChatStateMessage;
        dataform: FormsMessage;
        'marker:acknowledged': ReceivedMessage;
        'marker:displayed': ReceivedMessage;
        'marker:received': ReceivedMessage;
        receipt: ReceiptMessage;
        replace: CorrectionMessage;
        rtt: RTTMessage;
    }
}
export declare type ReceivedCarbon = ReceivedMessage & {
    carbon: CarbonMessage & {
        type: 'received';
    };
};
export declare type SentCarbon = ReceivedMessage & {
    carbon: CarbonMessage & {
        type: 'sent';
    };
};
export declare type ChatStateMessage = ReceivedMessage & {
    chatState: ReceivedMessage['chatState'];
};
export declare type ReceiptMessage = ReceivedMessage & {
    receipt: MessageReceipt;
};
export declare type CorrectionMessage = ReceivedMessage & {
    replace: ReceivedMessage['replace'];
};
export declare type RTTMessage = Message & {
    rtt: RTT;
};
export declare type FormsMessage = ReceivedMessage & {
    forms: DataForm[];
};
export default function (client: Agent): void;
