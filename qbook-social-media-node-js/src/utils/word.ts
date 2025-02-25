export function removeVietnameseTones(str: string) {
    return str
        .normalize('NFD') // Tách dấu khỏi ký tự
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D') // Chuyển đ -> d
        .toLowerCase(); // Chuyển về chữ thường
}
