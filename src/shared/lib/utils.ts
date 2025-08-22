/**
 * Очищает имя файла от дополнительного кода и тире в начале
 * @param fileName - исходное имя файла
 * @returns очищенное имя файла
 */
export const cleanFileName = (fileName: string): string => {
    return fileName.replace(/^\d+-/, "");
};
