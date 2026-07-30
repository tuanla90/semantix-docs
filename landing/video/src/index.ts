// Entry Remotion. Chạy `npm run registry` để sinh ./videos.gen.ts trước khi mở Studio.
import {registerRoot} from "remotion";
import {applyConfig, makeRoot} from "blog2video/root";
import {VIDEOS} from "./videos.gen";
import cfg from "../video.config.json";

applyConfig(cfg as any);          // PHẢI gọi trước registerRoot — brand/nhịp/nhạc lấy từ đây
registerRoot(makeRoot(VIDEOS));
