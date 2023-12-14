import React from 'react';

export function Quote() {
    const [quote, setQuote] = React.useState('Loading...');

    React.useEffect(() => {
        fetch('https://api.quotable.io/random?tags=Humorous')
        .then(response => response.json())
        .then(data => {
            setQuote(`${data.content} (${data.author})`);
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
        })

//         fetch('https://api.quotable.io/random')
//       .then((response) => response.json())
//       .then((data) => {
//         setQuote(data.content);
//         setQuoteAuthor(data.author);
//       })
//       .catch();
//   }, []);
      },[])
    return (
        <div className="row align-items-center">
        <div className="col-sm text-center">
          <p>{quote}</p>
        </div>
      </div>
    )
}