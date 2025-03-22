const loadcategoribtn = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
        const data = await res.json();
        showcategoryBTN(data.categories);

    }
    catch {
        console.log("error")
    }
}

const showcategoryBTN = (categories) => {

    const categoryCard = document.getElementById('category-Card');

    for (category of categories) {
        //console.log(category.category)
        let card = document.createElement('div');
        card.innerHTML =
            `
         <button id="btn-${category.id}"  onclick="loadpetsbycategory('${category.category}'); clickedBtn(${category.id});"  class="btn w-32 lg:w-40 sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"><img class="w-4 lg:w-8 "
                src="${category.category_icon}" alt="">${category.category}</button>
        `;
        categoryCard.append(card);
    }
}


let previousActiveBtn = null;

const clickedBtn = (id) => {
    //console.log(id)

    // Deactivate previous button if exists
    if (previousActiveBtn) {
        previousActiveBtn.style.backgroundColor = ""; // Reset background color
        previousActiveBtn.style.color = "black"; // Reset text color
    }
    // Activate current button
    const activebtn = document.getElementById(`btn-${id}`);
    if (activebtn) {

        activebtn.style.backgroundColor = "#422AD5"; // Change background color
        activebtn.style.color = "white"; // Change text color
        previousActiveBtn = activebtn; // Store current button as previous
    }


}

const loadpetsbycategory = async (ID) => {

    try {
        let url = `https://openapi.programming-hero.com/api/peddy/category/${ID}`;
        let res = await fetch(url);
        let data = await res.json();

        showPets(data.data)


    }
    catch {
        console.log('error')
    }

    // const activebtn = document.getElementById(`btn-${category.category}`);
    // console.log(activebtn)
}





const loadAllPets = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await res.json();
        showPets(data.pets);

    }
    catch {
        console.log("error")
    }
}

const showPets = (pets) => {



    const allpets = document.getElementById('all-pets')
    allpets.innerHTML = "";

    if (pets.length < 1) {
        allpets.innerHTML =

            `
 <div class="flex w-52 flex-col gap-4  col-span-full">
  <h2 class=" text-center text-2xl font-bold">NO Data To Show</h2>
  <div class="skeleton h-32 w-full"></div>
  <div class="skeleton h-4 w-28"></div>
  <div class="skeleton h-4 w-full"></div>
  <div class="skeleton h-4 w-full"></div>
</div>
        `;
    }

    for (let pet of pets) {



        let allpetdiv = document.createElement('div');
        allpetdiv.innerHTML =
            `
            <div class="   shadow-lg border-2 object-cover">
                <figure>
                    <img class="w-72  object-cover " src="${pet.image}" alt="Shoes" />
                </figure>
                <div class="p-4 ">
                    <h2 class="card-title mb-4">
                        ${pet.pet_name}

                    </h2>
                    <div class=" flex items-center gap-3">
                        <i class="fa-solid fa-circle-info"></i>
                        <p>Breed: ${pet.breed}</p>
                    </div>
                    <div class=" flex items-center gap-3">
                        <i class="fa-solid fa-calendar  "></i>
                        <p>Birth: ${pet.date_of_birth}</p>
                    </div>
                    <div class=" flex items-center gap-3">
                        <i class="fa-solid fa-venus"></i>
                        <p> Gender: ${pet.gender}</p>
                    </div>

                    <div class=" flex items-center gap-3">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p> Price : ${pet.price}</p>
                    </div>

                    <div class="card-actions flex justify-around mt-4 ">
                        <button onclick="loaddetails2(${pet.petId})" class="btn btn-sm "><i class="fa-solid fa-thumbs-up"></i></button>
                        <button class="btn btn-sm ">Adopt</button>
                        <button onclick="loaddetails(${pet.petId})" class="btn btn-sm ">Details</button>
                    </div>
                </div>
            </div>
    
    `;

        allpets.append(allpetdiv)


    }
}

const loaddetails = async (id) => {

    let url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showdetail(data.petData)


}
const loaddetails2 = async (id) => {

    let url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    throghimg(data.petData)
}

const throghimg = (data) => {

    let imgthrow = document.getElementById('imgthrow');


    if (data.image != null) {

        let imgbox = document.createElement('div');
        imgbox.innerHTML =
            `
        <img src="${data.image}" alt="">
        `;
        imgthrow.append(imgbox)
    }


}
const showdetail = (petDatas) => {


    document.getElementById('my_modal_5').showModal();
    let showdetail = document.getElementById('showdetail');
    showdetail.innerHTML =
        `
             <div class=" p-4  shadow-lg border-2 object-cover">
                <figure>
                    <img class=" w-[500px] object-cover " src="${petDatas.image}" alt="Shoes" />
                </figure>
                <div class="p-4 ">
                    <h2 class="card-title mb-4">
                        ${petDatas.pet_name}

                    </h2>
                    <div class=" flex items-center gap-3">
                        <i class="fa-solid fa-circle-info"></i>
                        <p>Breed: ${petDatas.breed}</p>
                    </div>
                    <div class=" flex items-center gap-3">
                        <i class="fa-solid fa-calendar  "></i>
                        <p>Birth: ${petDatas.date_of_birth}</p>
                    </div>
                    <div class=" flex items-center gap-3">
                        <i class="fa-solid fa-venus"></i>
                        <p> Gender: ${petDatas.gender}</p>
                    </div>

                    <div class=" flex items-center gap-3">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <p> Price : ${petDatas.price}</p>
                    </div>
                    <p class="text-xl font-bold mt-2 text-center">Details Information: </p>
                    <p class=" text-justify ">  ${petDatas.pet_details}</p>
                     
                </div>
            </div>

    `;


}

loadAllPets()
loadcategoribtn()