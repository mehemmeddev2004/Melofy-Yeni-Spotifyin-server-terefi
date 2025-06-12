"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const upload_constoants_1 = require("../../constants/upload.constoants");
const imageFileFilter = (req, file, callback) => {
    let ext = (0, path_1.extname)(file.originalname).slice(1);
    const checkMimeType = upload_constoants_1.UPLOAD_IMAGE_ALLOWED_MIME_TYPES.includes(file.mimetype);
    const checkFileType = upload_constoants_1.UPLOAD_IMAGE_ALLOWED_TYPES.includes(ext);
    if (!checkMimeType || !checkFileType)
        return callback(new common_1.BadRequestException('Imge type is not correct'), false);
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
//# sourceMappingURL=upload.filters.js.map