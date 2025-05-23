// button-status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href
        })
    })
}
// button-status

//form search
const fromSearch = document.querySelector("#form-search");
if (fromSearch) {
    let url = new URL(window.location.href);
    fromSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        //console.log(e);
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href
    })
}
//form search

//pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href
        })
    })
}
//pagination


//check-box multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name=id]");
    inputCheckAll.addEventListener("click", () => {
        console.log(inputCheckAll.checked);
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            })
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name=id]:checked").length;
            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            }
            else {
                inputCheckAll.checked = false;
            }
        })
    })
}
//check-box

//form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
//console.log(formChangeMulti);
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
        );

        const typeChange = e.target.elements.type.value;
        console.log(typeChange);
        if (typeChange == "delete-all") {
            const isConfrim = confirm("ban co chac chan ko");
            if (!isConfrim) {
                return;
            }

        }

        //console.log(inputsChecked);
        //console.log(checkboxMulti);
        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach(input => {
                const id = input.value;
                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }
                else {
                    ids.push(id);
                }

            })
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        } else {
            alert("vui long chon it nhAT 1 ban ghi")
        }
    })
}
//form change multi

//show alert
const showAlert= document.querySelector("[show-alert]")
if(showAlert){
    const time=parseInt(showAlert.getAttribute("data-time"));
    const closeAlert=showAlert.querySelector("[close-alert]");
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time)
    closeAlert.addEventListener("click",()=>{
        showAlert.classList.add("alert-hidden");
    })
}
//show alert

//upload image
const uploadImage=document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput=document.querySelector("[upload-image-input]");
    const uploadImagePreview=document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change",(e)=>{
        const file=e.target.files[0];
        if(file){
            uploadImagePreview.src=URL.createObjectURL(file);
        }
    })

}
//end upload image


// sort
const sort=document.querySelector("[sort]");
if(sort){
    let url= new URL(window.location.href);
    const sortSelect=sort.querySelector("[sort-select]");
    const sortClear=sort.querySelector("[sort-clear]");
    //console.log(sortClear)
    sortSelect.addEventListener("change",(e)=>{
        const value=e.target.value;
        const [sortKey,sortValue]=value.split("-");
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);

        window.location.href=url.href;
    })


    sortClear.addEventListener("click",()=>{
        //console.log(sortClear)
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href=url.href;
    })

    const sortKey=url.searchParams.get("sortKey");
    const sortValue=url.searchParams.set("sortValue",sortValue);
    if(sortKey&&sortValue){
        const stringSort=`${sortKey}-${sortValue}`;
        const optionSelected=sortSelect.querySelector(`option[value='${stringSort}']`)
        optionSelected.selected=true;
    }
}
// sort