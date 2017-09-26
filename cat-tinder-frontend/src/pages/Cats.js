import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Cats extends Component {
  render() {
    return (
        <div>
            <h1>All Cats</h1>
            <ul>
            {this.props.cats.map((cat, index) =>{
                return (
                    <li key={index}>
                        <Link to={`/cat/${cat.id}`}>
                            <div>
                                <h4 className='cat-name'>{cat.name}</h4>
                            </div>
                        </Link>
                    </li>
                )
            })}
            </ul>
        </div>
    );
  }
}
export default Cats
