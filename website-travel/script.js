// Toggle navigation menu for mobile view
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

// Form validation for booking
function validateBookingForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const bookingResponse = document.getElementById("bookingResponse");

    if (name === "" || email === "" || destination === "" || date === "") {
        bookingResponse.textContent = "Please fill in all fields.";
        bookingResponse.style.color = "red";
        return false;
    } else {
        bookingResponse.textContent = "Your booking is successful!";
        bookingResponse.style.color = "green";
        return false; // To prevent actual form submission
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");
    const receipt = document.getElementById("receipt");

    bookingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Ambil data dari form
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const destination = document.getElementById("destination").value;
        const date = document.getElementById("date").value;

        // Tampilkan receipt
        document.getElementById("receiptName").textContent = name;
        document.getElementById("receiptEmail").textContent = email;
        document.getElementById("receiptDestination").textContent = destination;
        document.getElementById("receiptDate").textContent = date;

        receipt.style.display = "block";
        bookingForm.style.display = "none";
    });
});

function downloadReceipt() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Ambil data dari receipt
    const name = document.getElementById("receiptName").textContent;
    const email = document.getElementById("receiptEmail").textContent;
    const destination = document.getElementById("receiptDestination").textContent;
    const date = document.getElementById("receiptDate").textContent;
    const people = document.getElementById("receiptPeople").textContent;
    const price = document.getElementById("receiptPrice").textContent;

    // Menambahkan konten ke PDF
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Booking Receipt", 20, 20);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Destination: ${destination}`, 20, 60);
    doc.text(`Date: ${date}`, 20, 70);
    doc.text(`Number of People: ${people}`, 20, 80);
    doc.text(`Total Price: ${price}`, 20, 90);

    // Simpan file PDF
    doc.save("Booking.pdf");
}


// Menentukan harga per orang untuk masing-masing destinasi
const prices = {
    "Bali": 1200,
    "Paris": 2500,
    "New York": 1800
};

function updateTotalPrice() {
    const destination = document.getElementById("destination").value;
    const people = document.getElementById("people").value;

    const totalPrice = prices[destination] * people;
    document.getElementById("totalPrice").textContent = `Total Price: $${totalPrice}`;

    // Update receipt price
    document.getElementById("receiptPrice").textContent = `$${totalPrice}`;
}


// Fungsi untuk validasi form pemesanan
function validateBookingForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const people = document.getElementById("people").value;
    const bookingResponse = document.getElementById("bookingResponse");

    // Validasi input
    if (name === "" || email === "" || destination === "" || date === "" || people === "") {
        bookingResponse.textContent = "Please fill in all fields.";
        bookingResponse.style.color = "red";
        return false;
    } else {
        // Pembaruan informasi pada tanda terima
        document.getElementById("receiptName").textContent = name;
        document.getElementById("receiptEmail").textContent = email;
        document.getElementById("receiptDestination").textContent = destination;
        document.getElementById("receiptDate").textContent = date;
        document.getElementById("receiptPeople").textContent = people;
        document.getElementById("receiptPrice").textContent = `$${prices[destination] * people}`;

        // Menampilkan receipt dan menyembunyikan form pemesanan
        document.getElementById("receipt").style.display = "block";
        document.getElementById("bookingForm").style.display = "none";

        bookingResponse.textContent = "Your booking is successful!";
        bookingResponse.style.color = "green";
        return false; // Prevent form submission
    }
}

// Event listener untuk update harga total setiap kali jumlah orang berubah
document.getElementById("people").addEventListener("input", updateTotalPrice);
