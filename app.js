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

yargs.parse();

// const contacts = require("./contacts");

// // menggunakan async await
// const main = async () => {
//   const nama = await contacts.tulisPertanyaan("Masukkan nama anda :");
//   const email = await contacts.tulisPertanyaan("Masukkan email anda :");
//   const noHP = await contacts.tulisPertanyaan("masukkan noHP anda :");

//   contacts.simpanContact(nama, email, noHP);
// };

// main();
