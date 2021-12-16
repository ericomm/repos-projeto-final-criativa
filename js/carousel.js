export class Carousel {
    constructor(anterior, proximo, listaProdutos, navegacao){
       // criando atributos pra cada um dos elementos passados pra dentro da classe
        this.anterior = document.querySelector(anterior)
        this.proximo = document.querySelector(proximo)
        this.listaProdutos = document.querySelector(listaProdutos)
        this.navegacao = document.querySelector(navegacao)

        // guardando retorno das listas
        this.slides = this.getListaSlides()
        this.indicadores = this.getListaIndicadores()
        this.tamanhoSlide = this.getTamanhoSlide()
        
        this.indiceDoSlideAtual = 0

        this.proximo.addEventListener('click', this.proximoSlide.bind(this))

        this.anterior.addEventListener('click', this.slideAnterior.bind(this))

        this.navegacao.addEventListener('click', this.pularParaSlide.bind(this))

        this.preparaSlides()   

    }

    // criando listas
    getListaSlides(){
        return Array.from(this.listaProdutos.children)
    }

    getListaIndicadores(){
        return Array.from(this.navegacao.children)
    }

    // funcao para retornar o tamanho de um slide
    getTamanhoSlide(){
        return this.slides[0].getBoundingClientRect().width
    }
    
    // funcao que faz busca baseado no indice
    getSlideAtual(){
        return this.slides[this.indiceDoSlideAtual]
    }


    getIndiceAtual(){
        return this.indicadores[this.indiceDoSlideAtual]
    }

    proximoSlide(){
        let proximaPosicao = this.indiceDoSlideAtual + 1
        if(proximaPosicao > this.slides.length - 1) {
            proximaPosicao = 0
        }

        this.vaParaSlide(proximaPosicao)
    }

    slideAnterior(){
        let posicaoAnterior = this.indiceDoSlideAtual - 1
        if(posicaoAnterior < 0) {
            proximaPosicao = this.slides.length - 1
        }
        
        this.vaParaSlide(posicaoAnterior)
    }

    //
    vaParaSlide(posicao){
        const indicadorAtual = this.getIndiceAtual()

        this.indiceDoSlideAtual = posicao

        const indicadorSelecionado = this.getIndiceAtual()

        this.scrollParaSlide(this.getSlideAtual())
        this.atualizaIndicadores(this.indiceDoSlideAtual, indicadorSelecionado)

    }

    scrollParaSlide(slideSelecionado){
        this.listaProdutos.style.transform = 'translateX(-' + slideSelecionado.style.left + ')'

    }

    atualizaIndicadores(indicadorAtual, indicadorSelecionado){
        indicadorAtual.classList.remove('carousel__indicador--ativo')

        indicadorSelecionado.classList.add('carousel__indicador--ativo')

    }

    pularParaSlide(evento){
        if(evento.target === evento.currentTarge) return

        const indicadorSelecionado = evento.target.getAttribute('data-indicador')
        this.vaParaSlide(parseInt(indicadorSelecionado))

    }

    preparaSlides(){
        this.slides.forEach((slide, i) =>{
            slide.style.left = this.tamanhoSlide * i + 'px'
        })
    }
}