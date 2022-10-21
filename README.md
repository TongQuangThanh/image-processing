### Scripts

- Install: `npm install`
- Build: `npm run build`
- Lint: `npm run lint`
- Prettify: `npm run prettify`
- Run unit tests: `npm run test`
- Start server: `npm run start`

### Usage

The server will listen on port 3080:

#### Brief instructions

http://localhost:3080/

#### Endpoint to resize images

http://localhost:3080/api/images

Expected query arguments are:

- _filename_: Available filenames are:
  - encenadaport
  - fjord
- _width_: numerical pixel value > 0
- _height_: numerical pixel value > 0

#### Endpoint 
http://localhost:3080
Welcome 

#### Example 
http://localhost:3080/api/images?filename=fjord&width=200&height=200
Successfully

### Notes

- Images are served from `assets/images/full`. Further images with the extension
  can be put into that directory, but the filetype is not checked
  (not required in exercise).
- Image thumbs will be stored in `assets/images/thumb` and can be deleted from
  there to verify that in that case they will be re-created on subsequent calls
  to the same endpoint.
