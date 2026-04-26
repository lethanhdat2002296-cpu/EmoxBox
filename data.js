// js/data.js
const EMOTIONS = [
  { id: 'birthday', label: 'Sinh Nhật', emoji: '🎂', description: 'Ghi dấu ngày đặc biệt không thể quên' },
  { id: 'apology', label: 'Xin Lỗi', emoji: '🙏', description: 'Gửi lời xin lỗi từ tận đáy chân thành' },
  { id: 'comfort', label: 'Ủi An', emoji: '🤗', description: 'Cái ôm ấm áp gói gọn trong hộp' },
  { id: 'exam_support', label: 'Tiếp Sức', emoji: '📚', description: 'Cổ vũ tinh thần vượt qua áp lực' },
  { id: 'thank_you', label: 'Cảm Ơn', emoji: '💛', description: 'Thể hiện lòng biết ơn chân thật' },
  { id: 'celebration', label: 'Ăn Mừng', emoji: '🎉', description: 'Bật tung cảm xúc vui vẻ!' },
  { id: 'breakup_comfort', label: 'Chữa Lành', emoji: '💔', description: 'Nhắc nhở rằng họ luôn được yêu thương' },
  { id: 'other', label: 'Bất Ngờ', emoji: '✨', description: 'Đôi khi không cần lý do' },
];

const FEATURED_BOXES = [
  {
    id: 'box-001',
    name: 'Cái Ôm Chữa Lành',
    tagline: 'Khi lời nói không thể diễn tả hết',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    price: 499000,
    badge: 'Bán Chạy Nhất',
    desc: 'Một bộ sưu tập ấm áp được thiết kế để xoa dịu tâm hồn và trao tặng một cái ôm tinh thần.'
  },
  {
    id: 'box-002',
    name: 'Tia Sáng Đêm Thu',
    tagline: 'Châm ngòi lửa tình yêu',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
    price: 850000,
    badge: 'Cao Cấp',
    desc: 'Bộ sưu tập cực kỳ tinh tế và quyến rũ, để kiến tạo ra bầu không khí lãng mạn hoàn hảo.'
  },
  {
    id: 'box-003',
    name: 'Tiếp Sức Chiến Binh',
    tagline: 'Nhiên liệu dồi dào cho não bộ',
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=800&auto=format&fit=crop',
    price: 350000,
    badge: 'Phổ Biến',
    desc: 'Mọi thứ bạn cần để thức xuyên đêm cho những kỳ thi căng thẳng. Cà phê đậm đặc, năng lượng tức thì.'
  }
];

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}
