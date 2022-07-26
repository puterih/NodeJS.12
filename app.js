// belajar membuat aplikasi sederhana Command Line Interface (CLI) yang dapat mengelola data contact
// CLI berjalan di terminal/ command line yg berbeda dengan aplikasi web

// Mengambil argument dari command line
const yargs = require("yargs");
const contacts = require("./contacts");

// .command(cmd, desc, [builder], [handler])
yargs
  .command({
    command: "add",
    describe: "Menambahkn contact baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "Nomor HandPhone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

// Menampilkan daftar semua nama contact
yargs.command({
  command: "list",
  describe: "Menambahkan semua nama & no HP contact.",
  handler() {
    contacts.listContact();
  },
});

// Menampilkan detail sebuah contact
yargs.command({
  command: "detail",
  describe: "Menambahkan detail sebuah contact berdasarkan nama.",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});

// Menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus sebuah contact berdasarkan nama.",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});

yargs.parse();
