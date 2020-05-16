
//Face Picker https://codepen.io/bronkula/pen/GRpBqMr

let faces = ["?","%","$","#"];

const setFace = (id) => {
  $(".profile-image .img").html(faces[id]);
  $("#face-choice").val(id);

const unsignNumber = max => n => n<0?n+max:n;
const signNumber = max => n => n>max*0.5?n-max:n<max*-0.5?n+max:n;
const wrapNumber = max => {
   const t = unsignNumber(max);
   const s = signNumber(max);
   return n => t(s(n));
}

setFace(0);

$(document)

.on("click",".face-choose.right",function(e){
  let face = wrapNumber(faces.length)(+$("#face-choice").val() + 1);
  setFace(face);
})
.on("click",".face-choose.left",function(e){
  let face = wrapNumber(faces.length)(+$("#face-choice").val() - 1);
  setFace(face);
})