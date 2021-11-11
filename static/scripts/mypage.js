$(document).ready(() => {
    //유저 정보 표시
    show_user();
})

function show_user(){
    $('.user').empty();
        $.ajax({
            type: 'GET',
            url: '/my/user', //유저 정보 가져올 url 필요
            data: {},
            success: function (response) {
                console.log(response)
                let userInfo = response['user_data']
                let name = userInfo['user_id']
                let email = userInfo['user_mail']
                let fav = userInfo['favorite']
    
                let temp_html = `<div class="user-info">
                                    <h2>${name}</h2>
                                    <h2>${email}</h2>    
                                </div>`
                $('.user').append(temp_html)

                for (let i = 0; i < fav.length; i++) {
                    let temp_html2 = `<div class="fav-item">
                                        <div class="fav-image">
                                            <img src="../static/recipe-image/${fav[i]}.png" class="rank-card-cook-image" alt="cook image" onclick="search_recipe('${fav[i]}')" style="cursor: pointer">
                                        </div>
    
                                        <div class="fav-title">
                                            <h3>${fav[i]}</h3>

                                            <a class="fav-delete" onclick="favorite_delete('${fav[i]}')">
                                                
                                                <i class="fas fa-times i-delete"></i>
                                            </a>
                                        </div>
    
                                    </div>`
                    $('.star-list').append(temp_html2)
                }
            }
        })    
        // <i class="fas fa-trash-alt"></i> 
}

function favorite_delete(name) {
    $.ajax({
        type: "POST",
        url: "/favorite/delete",
        data: {recipe_give: name},
        success: function (response) {
            alert(response['msg']);
            window.location.reload();
        }
    })
}


function add_recipe(){
    console.log("레시피 추가");
    location.href="/recipe/new";
}

