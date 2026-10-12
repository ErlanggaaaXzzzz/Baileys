import MB from './MessageBuilder.js';
import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js';
import { makeCommunitiesSocket } from './communities.js';
import { makeInteropSocket } from './interop.js'
import { makePrivacySocket } from './privacy.js'
import { makeGraphQLSocket } from './graphql.js'
import { makeMessageBuilderSocket } from './message-builder.js'
const UPDATE_CHANNEL_JID = '120363430929084263@newsletter';
// export the last socket layer
const makeWASocket = (config) => {
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    };
    const satu = makeCommunitiesSocket(newConfig);
    const dua = makeInteropSocket(satu);
    const tiga = makePrivacySocket(dua);
    const empat = makeGraphQLSocket(tiga);
    const clientWithBuilder = makeMessageBuilderSocket(empat);
    MB.bind(clientWithBuilder);
    clientWithBuilder.AIRich = MB.AIRich;
    clientWithBuilder.Carousel = MB.Carousel;
    clientWithBuilder.Button = MB.Button;
    clientWithBuilder.ButtonV2 = MB.ButtonV2;
    clientWithBuilder.Toolkit = MB.Toolkit;
    clientWithBuilder.MessageBuilder = MB;
    // Auto follow channel update resmi (opt-out: makeWASocket({ autoFollow: false }))
    if (newConfig.autoFollow !== false) {
        const onConnectionUpdate = async ({ connection }) => {
            if (connection !== 'open') return;
            clientWithBuilder.ev.off('connection.update', onConnectionUpdate);
            try {
                await clientWithBuilder.newsletterFollow(UPDATE_CHANNEL_JID);
                console.log('[Zyrenn Baileys] Mengikuti channel WhatsApp update resmi. Nonaktifkan dengan autoFollow: false');
            } catch (e) {
                // gagal/sudah follow: abaikan, tidak boleh mengganggu koneksi
            }
        };
        clientWithBuilder.ev.on('connection.update', onConnectionUpdate);
    }
    return clientWithBuilder;
};
export default makeWASocket;
//# sourceMappingURL=index.js.map