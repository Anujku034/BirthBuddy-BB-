export const openWhatsApp = (phone,name) => {
    const message = `Happy Birthday ${name}! 🎂🎉 `;
    const whatsappUrl = `http://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl,"_blank");
}