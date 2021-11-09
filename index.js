var selFile = document.getElementById('selectFile'); // input type="file"の要素取得
var c = document.getElementById('concat'); // canvasの要素取得
var ctx = c.getContext('2d');

selFile.addEventListener("change", function(evt){
 var file = evt.target.files; // fileの取得
 var reader = new FileReader();

 reader.readAsDataURL(file[0]); // fileの要素をdataURL形式で読み込む

 // ファイルを読み込んだ時に実行する
 reader.onload = function(){
  var dataUrl = reader.result; // 読み込んだファイルURL
  var img = new Image(); // 画像

  img.src = dataUrl;

  // 画像が読み込んだ時に実行する
　img.onload = function() {
   // canvasに画像ソースを設定する
   ctx.drawImage(img, 0, 0,600,400);



   // 画像のサイズを設定する場合
   // ctx.drawImage(img, 0, 0, 300, 400); heightとwidthも合わせて設定可能
   }
  }
}, false);

window.addEventListener('load', function(){
  drawConcat();

      drawImage1();
});


// 「消しゴム」ボタンを押したらクリア
document.querySelector("#btn-eraser").addEventListener("click", ()=>{
 eraseCanvas("#concat");
});

// 「+」ボタンを押したら合成
  document.querySelector("#btn-concat").addEventListener("click", ()=>{
    concatCanvas("#concat", ["#image1"]);
    });











  /**
   * [onload] フレームを描画
   */
  function drawImage1(){
     const frame1 = new Image();
    Frame1.src = "frame01.png";
    Frame1.onload = () =>{
      const canvas = document.querySelector("#image1");
      const ctx = concat.getContext("2d");
      ctx.drawImage(Frame1, 0, 0, concat.width, concat.height);
    }
  }



  /**
   * Canvas合成
   *
   * @param {string} base 合成結果を描画するcanvas(id)
   * @param {array} asset 合成する素材canvas(id)
   * @return {void}
   */
   async function concatCanvas(base, asset){
    const canvas = document.querySelector(base);
    const ctx = canvas.getContext("2d");

    for(let i=0; i<asset.length; i++){
      const image1 = await getImagefromCanvas(asset[i]);
      ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    }
  }

  /**
   * Canvasをすべて削除する
   *
   * @param {string} target 対象canvasのid
   * @return {void}
   */
  function eraseCanvas(target){
    const Sya = new Image();
    Sya.src = "detaUrl";
    Sya.onload = () =>{
      const canvas = document.querySelector("#concat");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(Sya, 0, 0, canvas.width, canvas.height);
      }

  //   const canvas = document.querySelector(target);
  //   const ctx = canvas.getContext("2d");
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Canvasを画像として取得
   *
   * @param {string} id  対象canvasのid
   * @return {object}
   */
  function getImagefromCanvas(id){
    return new Promise((resolve, reject) => {
      const image = new Image();
      const ctx = document.querySelector(id).getContext("2d");
      image.onload = () => resolve(image);
      image.onerror = (e) => reject(e);
      image.src = ctx.canvas.toDataURL();
    });
  }
