class TestClass {
  constructor(){
    this.place = "The moon"
    this.array = ["The sun","the earth", "the stars"]
  }

  whereAreWe(){
    console.log(this)
  }

  // thisUnbound(){
  //   document.querySelector(".click-me").addEventListener("click",this.buttonCode)
  // }

  thisBound(){
    document.querySelector(".click-me").addEventListener("click",this.buttonCode.bind(this))
  }

  buttonCode(){
    console.log("Click")
    console.log(this)
  }

}


let test = new TestClass

// test.thisUnbound()
test.thisBound()