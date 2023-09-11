const React = require('react')

class Show extends React.Component {
  render () {
    const fruit = this.props.fruit

    return (
      <div>
        <h1> Show Page </h1>
        The {fruit.name} is {fruit.color}.
        And {
          fruit.readyToEat ? 
            "It is ready to eat!"
          :
            "It is not ready to eat... Cant touch this"
        }
        <img src={fruit.img} alt="" />
      </div>
    );
  }
}

module.exports = Show;


//hooks will not work b/c it does not have virtual dom

// function Show (props) {
//     const { name, color,readyToEat } = props.fruit
//     return (
//         <div>
//             <h1> Show Page</h1>
//             The {name} is {color}.
//             And {
//                 readyToEat ? 
//                 "It is ready to eat!"
//                 :
//                 "It is not ready to eat .. Cant touch this"
//             }
//         </div>
//     )
// }

// module.exports = Show;