// belajar membuat aplikasi sederhana Command Line Interface (CLI) yang dapat mengelola data contact
// CLI berjalan di terminal/ command line yg berbeda dengan aplikasi web

const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// membuat folder dara jika belum ada
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf8");
  const contacts = JSON.parse(fileBuffer); // mengubah dari array string ke json
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const contacts = loadContact();

  // Cek Duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  // menggunakan method find ketika ketemu nama yg sesuai, penelusurannya akan berhenti
  if (duplikat) {
    console.log(chalk.red.inverse.bold("Contact sudah terdaftar, gunakan nama lain!"));
    return false;
  }

  // Cek Email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  // Cek Nomor HandPhone
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor HP tidak valid!"));
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold("Terimakasih sudah memasukkan data."));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.yellow.inverse.bold("Daftar Kontak : "));
  // looping menggunakan forEach
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  // pengecekan jika ada isinya maka tampilkan detailnya, jika tidak ada tampilkan pesan err/tidak ditemukan.
  if (!contact) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  // jika ditemukan data nama yg dicari
  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.noHP);
  if (contact.email) {
    console.log(contact.email);
  }
};

//  Cara menghapus data berdasarkan nama pada aplikasi contact
const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    // aturannya menggunakan method find, tetapi menggunakan method filter penelusurannya dilakukan terus sampai array nya selesai
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));

  console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus!`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
