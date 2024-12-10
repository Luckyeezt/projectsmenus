function change(project){
    switch(project) {
        case 1:
            window.location.href = "gen_mdp/gen_pass.html"
            break;
        case 2:
            window.location.href = "guess_the_num/gtn_html.html"
            break;
        default:
            alert("Nous rencontrons actuellement un soucis.")
            break;
    }
}