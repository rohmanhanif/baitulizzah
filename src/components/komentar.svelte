<script>
  import excalibur from "excalibur-zen";
  import toast from "only-toast";

  let server = "https://excalibur.asatour.id/sql.php";
  let akses = "8a8cb7100aef398ab3f474917113393d"; // id, nama, email, website, message, link

  let nama = "";
  let email = "";
  let website = "";
  let message = "";

  let data_komentar = [];

  async function ambil_datanya() {
    let mengambil = await excalibur(server, {
      id: akses,
      kunci: "ambil",
      link: location.href,
    });
    mengambil = await mengambil.json();
    data_komentar = mengambil;
  }
  ambil_datanya();

  async function kirim() {
    let mengirim = await excalibur(server, {
      id: akses,
      kunci: "tambah",
      nama,
      email,
      website,
      message,
      link: location.href,
    });
    if (mengirim) {
      toast("Data sudah terkirim");
      nama = "";
      email = "";
      website = "";
      message = "";
      ambil_datanya();
    }
  }
</script>

<form on:submit|preventDefault={kirim} action="#" class="">
  <div class="form-group">
    <label for="name">Name *</label>
    <input type="text" bind:value={nama} class="form-control" id="name" />
  </div>
  <div class="form-group">
    <label for="email">Email *</label>
    <input type="email" class="form-control" bind:value={email} id="email" />
  </div>
  <div class="form-group">
    <label for="website">Website</label>
    <input type="url" class="form-control" bind:value={website} id="website" />
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea
      name=""
      id="message"
      cols="30"
      rows="10"
      bind:value={message}
      class="form-control"
    ></textarea>
  </div>
  <div class="form-group">
    <input
      type="submit"
      value="Post Comment"
      class="btn btn-primary btn-md text-white"
    />
  </div>
</form>
{#if data_komentar.length > 0}
  <div class="grid grid-cols-1 gap-3">
    {#each data_komentar as x}
      <div class="border rounded overflow-hidden [&>*]:p-3">
        <div class="bg-blue-500 text-white">{x.nama}</div>
        <div>{x.message}</div>
      </div>
    {/each}
  </div>
{/if}
<!-- {JSON.stringify(data_komentar)} -->
