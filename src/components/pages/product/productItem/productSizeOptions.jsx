import React from 'react';

export default function SizeOptions({ data }) {
    var items;

    if (data) {
        items = data.map((value, index) => (
            <SizeOptionItem key={index} description={value.description} file={value.link} name={value.name} />
        ));
    } else {
        items = <tr><th>n/a</th></tr>
    }

    return (
        <>
            <h2 className="red-bar-below">Size Options</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">File Name</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </>
    );
}


function SizeOptionItem(props) {
    const { description, file, name } = props;
    return (
        <tr>
            <td>{description ? description : "n/a"}</td>
            <td><a href={file} target="_blank">{name}</a></td>
        </tr>
    )
}