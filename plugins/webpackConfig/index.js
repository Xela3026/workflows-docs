import path from 'path';
const brandName = process.env.brand || 'yabbr';
const brandDirectory = `../../src/brands/${brandName}`;
const customCss = `../../src/brands/${brandName}/custom.css`;
console.log(`Compiling ${brandName} branded docs.`);
console.log(`Brand config at: ${path.resolve(__dirname, brandDirectory)}\n`);

export default function () {
    return {
      name: 'webpackConfig',
      configureWebpack() {
        return {
          
            resolve: {
                alias: {
                  brand: path.resolve(__dirname, brandDirectory),
                },
              },
              cache: {
                version: `${process.env.brand}`,
              },
            
        }
        
        
      },
      getClientModules() {
        return [path.resolve(__dirname, customCss)];
      }
    };
  }



  
  