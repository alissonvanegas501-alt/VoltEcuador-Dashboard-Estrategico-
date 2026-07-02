/*************************************************
 DASHBOARD ESTRATÉGICO MULTIMATRIZ
 VoltEcuador
**************************************************/

document.addEventListener("DOMContentLoaded", () => {

    inicializarMenu();
    inicializarKPIs();
    animarTarjetas();

});


/*************************************************
 MENÚ LATERAL
**************************************************/

function inicializarMenu() {

    const enlaces = document.querySelectorAll(".sidebar a");
    const paginas = document.querySelectorAll(".pagina");

    enlaces.forEach(link => {

        link.addEventListener("click", function(e){

            e.preventDefault();

            // quitar activo
            enlaces.forEach(l =>
                l.classList.remove("active")
            );

            this.classList.add("active");

            const destino = this.getAttribute("href")
                                .replace("#","");

            paginas.forEach(p => {
                p.style.display = "none";
            });

            const pagina = document.getElementById(destino);

            if(pagina){
                pagina.style.display = "block";

                pagina.scrollIntoView({
                    behavior:"smooth"
                });
            }

        });

    });

}


/*************************************************
 KPIs
**************************************************/

function inicializarKPIs(){

    const barras =
        document.querySelectorAll(".progress-bar");

    barras.forEach(barra => {

        const porcentaje =
            barra.dataset.value || 0;

        barra.style.width = "0%";

        setTimeout(() => {

            barra.style.transition =
                "width 1.5s ease";

            barra.style.width =
                porcentaje + "%";

        },300);

    });

}


/*************************************************
 ESTADOS KPI
**************************************************/

function calcularEstado(actual,meta){

    const porcentaje =
        (actual/meta)*100;

    if(porcentaje>=100)
        return "Cumplido";

    if(porcentaje>=70)
        return "Seguimiento";

    return "Crítico";

}


/*************************************************
 COLORES KPI
**************************************************/

function colorEstado(estado){

    switch(estado){

        case "Cumplido":
            return "#22c55e";

        case "Seguimiento":
            return "#3b82f6";

        case "Crítico":
            return "#ef4444";

        default:
            return "#999";
    }

}


/*************************************************
 ANIMACIÓN TARJETAS
**************************************************/

function animarTarjetas(){

    const cards =
        document.querySelectorAll(".card");

    cards.forEach((card,i)=>{

        card.style.opacity=0;
        card.style.transform=
            "translateY(20px)";

        setTimeout(()=>{

            card.style.transition=
                "all .6s ease";

            card.style.opacity=1;

            card.style.transform=
                "translateY(0px)";

        }, i*100);

    });

}


/*************************************************
 ACTUALIZAR KPI
**************************************************/

function actualizarKPI(
        idActual,
        meta,
        idEstado,
        idBarra){

    const actual =
        parseFloat(
            document
            .getElementById(idActual)
            .value
        );

    const estado =
        calcularEstado(actual,meta);

    const porcentaje =
        Math.min(
            (actual/meta)*100,
            100
        );

    const etiqueta =
        document
        .getElementById(idEstado);

    etiqueta.innerHTML = estado;
    etiqueta.style.color =
        colorEstado(estado);

    const barra =
        document
        .getElementById(idBarra);

    barra.style.width =
        porcentaje+"%";

    barra.style.background =
        colorEstado(estado);

}


/*************************************************
 FILTRO DE BÚSQUEDA
**************************************************/

function buscarMenu(){

    const texto =
        document
        .getElementById("buscar")
        .value
        .toLowerCase();

    const items =
        document
        .querySelectorAll(
            ".sidebar li"
        );

    items.forEach(item=>{

        const valor =
            item.innerText
            .toLowerCase();

        item.style.display =
            valor.includes(texto)
            ? "block"
            : "none";

    });

}


/*************************************************
 RELOJ DEL DASHBOARD
**************************************************/

function reloj(){

    const ahora =
        new Date();

    const fecha =
        ahora.toLocaleString(
            "es-EC"
        );

    const reloj =
        document
        .getElementById(
            "reloj"
        );

    if(reloj)
        reloj.innerHTML =
            fecha;
}

setInterval(reloj,1000);