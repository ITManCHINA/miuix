const str = 'PathNode.QuadTo(647.7f, 109.2f, 660.2f, 115.2f)';
const regex = /([-0-9.]+)f,\s*([-0-9.]+)f,\s*([-0-9.]+)f,\s*([-0-9.]+)f/;
console.log(str.match(regex));
