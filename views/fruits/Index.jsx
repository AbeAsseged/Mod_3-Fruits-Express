//WK13D1

const React = require("react")
const DefaultLayout = require('../layout/Default');


class Index extends React.Component {
  render() {
    const { fruits } = this.props
    return (
      <DefaultLayout title={"Fruits Index Page"}>
          <nav>
            <a href="/fruits/new">Create a New Fruit</a>
          </nav>
          <ul>
            {
              fruits.map((fruit, i) => {
                return (
                  <li key={i}>
                    The{' '}
                    <a href={`/fruits/${fruit._id}`}>
                      {fruit.name}
                    </a>
                    {' '}
                    is {fruit.color} <br></br>
                    {
                      fruit.readyToEat ?
                        `It is ready to eat`
                        :
                        `It is not ready to eat`
                    }
                    <br />
                    <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>
                    {/* your delete form goes here*/}
                    <form action={`/fruits/${fruit._id}?_method=DELETE`} method='POST'>
                      <input type='submit' value='DELETE' />
                    </form>
                  </li>

                )
              })
            }
          </ul>
      </DefaultLayout>
    )
  }
}

module.exports = Index







































//W12D3
// const React = require("react")


// class Index extends React.Component {
//   render() {
//     const { fruits } = this.props
//     return(
//       <div>
//         <h1> Fruits Index Page </h1>
//         <nav>
//           <a href="/fruits/new">Create a New Fruit</a>
//         </nav>
//         <ul>
//           {
//             fruits.map((fruit, i) => {
//               return (
//                 <li key={i}>
//                   The{' '}
//                   <a href={`/fruits/${fruit._id}`}> 
//                     {/* <a href={`/fruits/${i}`}> for w/out mongoDb W12D1-2 not for for W12D3 */}
//                       {fruit.name}
//                     </a>
//                     {' '}
//                     is {fruit.color} <br></br>
//                     {
//                       fruit.readyToEat ? 
//                         `It is ready to eat`
//                       : 
//                         `It is not ready to eat`
//                     }
//                                       <br />
//                 </li>
//               )
//             })
//           }
//         </ul>
//       </div>
//     )
//   }
// }

// module.exports = Index