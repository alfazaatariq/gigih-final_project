import Products from '../../../interfaces/products';

const ProductsList = ({ products }: { products: Products[] }) => {
  return (
    <div>
      <ul
        id='products-box'
        className='flex items-center space-x-2 overflow-auto py-2'
      >
        {products.map((product) => {
          return (
            <a key={product._id} href={product.link}>
              <li>
                <div className='text-white bg-slate-700 rounded-lg p-2 cursor-pointer hover:bg-slate-400'>
                  <p className='line-clamp-1'>{product.name}</p>
                  <p>Rp.{product.price}</p>
                </div>
              </li>
            </a>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
