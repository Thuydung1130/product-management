// // Delete item
document.addEventListener("DOMContentLoaded", () => {
    const buttonDelete = document.querySelectorAll("[button-delete]");
    console.log(buttonDelete);
    console.log("ok");
    if (buttonDelete.length > 0) {
        const formDeleteItem = document.querySelector("#form-delete-item");
        const path = formDeleteItem.getAttribute("data-path");
        buttonDelete.forEach(button => {
            
            button.addEventListener("click", (event) => {
                
                event.preventDefault();
                if (button.disabled) return;

                // Chặn sự kiện nhấn nút tiếp theo
                
                const isConfirm = confirm("ban chac chua");

                if (isConfirm) {
                    button.disabled = true;
                    const id = button.getAttribute("data-id");
                    const action = `${path}/${id}?_method=DELETE`;
                    formDeleteItem.action = action;
                    formDeleteItem.submit();
                    
                }
                else {
                    
                    // Nếu không xác nhận, bỏ chặn nút
                    button.disabled = false;
                }
            })
        })
    }
})
// Delete item

// document.addEventListener("click", function (event) {
//     // Kiểm tra phần tử nào vừa được click có attribute [button-delete]
//     const deleteButton = event.target.closest("[button-delete]");
//     if (deleteButton) {
//       const confirmDelete = confirm("Bạn chắc chưa?");
//       if (confirmDelete) {
//         const formDeleteItem = document.querySelector("#form-delete-item");
//         formDeleteItem.reset();
//         const path = formDeleteItem.getAttribute("data-path");
//         const id = deleteButton.getAttribute("data-id");
//         formDeleteItem.action = `${path}/${id}?_method=DELETE`;
//         formDeleteItem.submit();
//       }
//     }
//   });
