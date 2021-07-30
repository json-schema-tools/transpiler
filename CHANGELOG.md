## [1.10.2](https://github.com/json-schema-tools/transpiler/compare/1.10.1...1.10.2) (2021-07-30)


### Bug Fixes

* replaceTypeAsArray should use titleizer ([951d511](https://github.com/json-schema-tools/transpiler/commit/951d51182005d15d2ba2a0424980627b6f41d0ed))

## [1.10.1](https://github.com/json-schema-tools/transpiler/compare/1.10.0...1.10.1) (2021-06-24)


### Bug Fixes

* update to new meta-schema ([13487f5](https://github.com/json-schema-tools/transpiler/commit/13487f52f577f0d3a3d41741152097b6cbc22c9d))

# [1.10.0](https://github.com/json-schema-tools/transpiler/compare/1.9.0...1.10.0) (2021-06-18)


### Features

* rust boxing properly now ([d1b2981](https://github.com/json-schema-tools/transpiler/commit/d1b2981c099ad34f0825de21950d31ca764a0557))

# [1.9.0](https://github.com/json-schema-tools/transpiler/compare/1.8.2...1.9.0) (2021-06-17)


### Bug Fixes

* add return types to most of the utils ([75b3245](https://github.com/json-schema-tools/transpiler/commit/75b32451381bdee03ff2eadedd8b1456b97ee67c))
* clean up remenants of bad ideas ([9d0ef32](https://github.com/json-schema-tools/transpiler/commit/9d0ef32150a58632ca96237fb8102af778c3c89d))
* run lint fix ([9a2d65e](https://github.com/json-schema-tools/transpiler/commit/9a2d65e89dbc68d0f17f7454b31ac6b56052e801))
* update deps and regen package-lock ([6ea95ee](https://github.com/json-schema-tools/transpiler/commit/6ea95ee2a3c2750fad6048faed616e90e9af31b5))


### Features

* augment schemas with isCycle ([07d7015](https://github.com/json-schema-tools/transpiler/commit/07d7015658ba3a47e04a0ce0a10a75097ea6bc4c)), closes [#382](https://github.com/json-schema-tools/transpiler/issues/382)

## [1.8.2](https://github.com/json-schema-tools/transpiler/compare/1.8.1...1.8.2) (2021-06-15)


### Bug Fixes

* serialize attrs syntax ([b0dc179](https://github.com/json-schema-tools/transpiler/commit/b0dc179c6a6c9e0bc2688d8310e89d6c7424cdf6)), closes [#381](https://github.com/json-schema-tools/transpiler/issues/381)

## [1.8.1](https://github.com/json-schema-tools/transpiler/compare/1.8.0...1.8.1) (2021-06-15)


### Bug Fixes

* non literal enum should not derive eq ([b86f15c](https://github.com/json-schema-tools/transpiler/commit/b86f15ce00e782e667c0ab1196407ca9cf9cfad9)), closes [#384](https://github.com/json-schema-tools/transpiler/issues/384)

# [1.8.0](https://github.com/json-schema-tools/transpiler/compare/1.7.6...1.8.0) (2021-06-11)


### Features

* rust fixes & general maintenance items ([4b78a06](https://github.com/json-schema-tools/transpiler/commit/4b78a068793f6dc475b224487d4f861ac217ed80))

## [1.7.6](https://github.com/json-schema-tools/transpiler/compare/1.7.5...1.7.6) (2021-05-27)


### Bug Fixes

* update test and fix edge case ([8ea5304](https://github.com/json-schema-tools/transpiler/commit/8ea5304fcb82b1204142ecd8aa0db6db0f77a906))

## [1.7.5](https://github.com/json-schema-tools/transpiler/compare/1.7.4...1.7.5) (2021-05-27)


### Bug Fixes

* reserved words checked after prefix ([59b8e10](https://github.com/json-schema-tools/transpiler/commit/59b8e107e1b98e9f638efeb3d613d61e05fcc84a))

## [1.7.4](https://github.com/json-schema-tools/transpiler/compare/1.7.3...1.7.4) (2021-05-27)


### Bug Fixes

* serde include ([0ff8942](https://github.com/json-schema-tools/transpiler/commit/0ff894213e9112e2463a6560cb977a3d6b296073))

## [1.7.3](https://github.com/json-schema-tools/transpiler/compare/1.7.2...1.7.3) (2021-05-26)


### Bug Fixes

* rust struct field naming ([cc664d5](https://github.com/json-schema-tools/transpiler/commit/cc664d5791b8f5a8f89bfd381d63bd14ddfe8ce3))

## [1.7.2](https://github.com/json-schema-tools/transpiler/compare/1.7.1...1.7.2) (2021-05-26)


### Bug Fixes

* remove leading symbols in languages that dont allow them ([8ab3291](https://github.com/json-schema-tools/transpiler/commit/8ab3291b02a08551341e821b723e911f71e25b37))

## [1.7.1](https://github.com/json-schema-tools/transpiler/compare/1.7.0...1.7.1) (2021-05-20)


### Bug Fixes

* bump deps for security fixes ([32cb664](https://github.com/json-schema-tools/transpiler/commit/32cb6645a311abc051cad766a66783c4c1745afc))
* code cleanup ([03cad4e](https://github.com/json-schema-tools/transpiler/commit/03cad4e8003c1cc342a8966a32a82d2b4f8cf738))
* string enums for rust python and go ([206d288](https://github.com/json-schema-tools/transpiler/commit/206d2889d648ea6092145c9e77d47c0f17548275))

# [1.7.0](https://github.com/json-schema-tools/transpiler/compare/1.6.1...1.7.0) (2020-12-10)


### Bug Fixes

* lint fixing ([4b22c50](https://github.com/json-schema-tools/transpiler/commit/4b22c50216912ddb8be39f96e30247d9d3617206))
* remove console logs ([ec729f5](https://github.com/json-schema-tools/transpiler/commit/ec729f5ca07a03a8ec1e28609223f278dc6ccee7))


### Features

* handle type as array in best way possible ([e435656](https://github.com/json-schema-tools/transpiler/commit/e4356561e1e4396d5b53bb2792cb7a6a87bc7475))

## [1.6.1](https://github.com/json-schema-tools/transpiler/compare/1.6.0...1.6.1) (2020-12-07)


### Bug Fixes

* no longer use nodenv in gh action ([3a91e8e](https://github.com/json-schema-tools/transpiler/commit/3a91e8e49ba3384df118f25cc416b9c9949dd67d))

# [1.6.0](https://github.com/json-schema-tools/transpiler/compare/1.5.7...1.6.0) (2020-11-16)


### Bug Fixes

* replace referencer with packaged one ([ce62da2](https://github.com/json-schema-tools/transpiler/commit/ce62da2f22bbae79f5746c496dcdcf35e924ec9e))
* run lint fix ([6a2e926](https://github.com/json-schema-tools/transpiler/commit/6a2e9265371f3d10e18be4a8b2e6e02efb3affe1))


### Features

* implement const in ts and rust ([cbeb502](https://github.com/json-schema-tools/transpiler/commit/cbeb5025ea11bafb827d6c794e5cd99bccfbb886))

## [1.5.7](https://github.com/json-schema-tools/transpiler/compare/1.5.6...1.5.7) (2020-11-04)


### Bug Fixes

* add docs ([d26e853](https://github.com/json-schema-tools/transpiler/commit/d26e853b326a0fd8ad4d027b68fec3a8fa504d8f))
* add try me link ([503b4e3](https://github.com/json-schema-tools/transpiler/commit/503b4e3432dc81eb9bf75f1b751f1f08969141bb))

## [1.5.6](https://github.com/json-schema-tools/transpiler/compare/1.5.5...1.5.6) (2020-10-29)


### Bug Fixes

* bump dev deps ([7db8ef4](https://github.com/json-schema-tools/transpiler/commit/7db8ef4bf7d59da537879117f544bbd6919991a8))

## [1.5.5](https://github.com/json-schema-tools/transpiler/compare/1.5.4...1.5.5) (2020-10-28)


### Bug Fixes

* update meta-schema ([89ead9e](https://github.com/json-schema-tools/transpiler/commit/89ead9e1681c55b12d19a1fb31e2c645dbd12367))

## [1.5.4](https://github.com/json-schema-tools/transpiler/compare/1.5.3...1.5.4) (2020-10-23)


### Bug Fixes

* oc name ([cc5fc97](https://github.com/json-schema-tools/transpiler/commit/cc5fc979d0d86ce7aa18cc6fcc6b5c5541218c05))

## [1.5.3](https://github.com/json-schema-tools/transpiler/compare/1.5.2...1.5.3) (2020-10-23)


### Bug Fixes

* add funding ([3519541](https://github.com/json-schema-tools/transpiler/commit/35195416503e1f12f5e9859bb359fe3bea2f40b8))

## [1.5.2](https://github.com/json-schema-tools/transpiler/compare/1.5.1...1.5.2) (2020-10-23)


### Bug Fixes

* clean up example ([19accca](https://github.com/json-schema-tools/transpiler/commit/19accca693089cf778c1758fd9cc9ba32ab8571f))
* update node-fetch ([689bc50](https://github.com/json-schema-tools/transpiler/commit/689bc502502c25357d4e6497bccc3691d5cd7b51))

## [1.5.1](https://github.com/json-schema-tools/transpiler/compare/1.5.0...1.5.1) (2020-10-23)


### Bug Fixes

* add readme badges ([9cd2cf2](https://github.com/json-schema-tools/transpiler/commit/9cd2cf2296637ae4b67515b06a880e936a903f95))
* refresh package-lock ([84ae1d2](https://github.com/json-schema-tools/transpiler/commit/84ae1d269c860e34beb95a7bc9995afceea5760c))
* remove junk deps ([f054c90](https://github.com/json-schema-tools/transpiler/commit/f054c90ff40132f62b9de33fd5609f79f4718b37))
* remove unused dep ([050debe](https://github.com/json-schema-tools/transpiler/commit/050debec6e11b84552f67107fae0fbfc645739af))
* update deps ([0012a47](https://github.com/json-schema-tools/transpiler/commit/0012a473684a2abdbb21923a3f993e1080d2ddb0))

# [1.5.0](https://github.com/json-schema-tools/transpiler/compare/1.4.3...1.5.0) (2020-10-09)


### Bug Fixes

* get it all working ([7e10cbf](https://github.com/json-schema-tools/transpiler/commit/7e10cbff62765ad5b9ee661307ac295cc5cd71af))
* interface was incorrect ([8a55496](https://github.com/json-schema-tools/transpiler/commit/8a55496547e671b24747dc73fce00a5ae25d59af))
* update node version ([c2374f4](https://github.com/json-schema-tools/transpiler/commit/c2374f4f5eb7b8752fab6c7ebc3e01e890264cc5))


### Features

* implement imports as part of IR ([9f7ba6b](https://github.com/json-schema-tools/transpiler/commit/9f7ba6bfd07f70f4044279cf65cdd8274408b84b))

## [1.4.3](https://github.com/json-schema-tools/transpiler/compare/1.4.2...1.4.3) (2020-10-08)


### Bug Fixes

* update docs for titleizer ([5c6f8fa](https://github.com/json-schema-tools/transpiler/commit/5c6f8fab79207b4aa597a06e8f3dfb759c7166ae))

## [1.4.2](https://github.com/json-schema-tools/transpiler/compare/1.4.1...1.4.2) (2020-09-09)


### Bug Fixes

* add a couple more test assertions ([4e567dd](https://github.com/json-schema-tools/transpiler/commit/4e567dda33a1e81a74893e71c017b8b5aeb1f6bf))
* more testing ([7169139](https://github.com/json-schema-tools/transpiler/commit/7169139a21a9aac9c75db4c75e0c2d9b0f2ea804))

## [1.4.1](https://github.com/json-schema-tools/transpiler/compare/1.4.0...1.4.1) (2020-07-28)


### Bug Fixes

* only publish built files ([bd90329](https://github.com/json-schema-tools/transpiler/commit/bd9032975b4db6d5b02f22c890943c2aed1ae749))

# [1.4.0](https://github.com/json-schema-tools/transpiler/compare/1.3.0...1.4.0) (2020-07-28)


### Bug Fixes

* add to package json and remove hold ([385774e](https://github.com/json-schema-tools/transpiler/commit/385774e0f60983acfd66b64d9ae5c38df75f1245))
* adjust circle buld ([22d2105](https://github.com/json-schema-tools/transpiler/commit/22d2105c656ed4cd2aa11474bfe4186a8434a6c7))
* properly set repo ([6fab520](https://github.com/json-schema-tools/transpiler/commit/6fab520f7c8460ac4ead65d5741192fc2d68cd08))
* update package lock ([4059b56](https://github.com/json-schema-tools/transpiler/commit/4059b564dacfabe149caaee6e4e062dccc80b5ad))


### Features

* generate code for patternProperties ([c5e38b9](https://github.com/json-schema-tools/transpiler/commit/c5e38b9e6feaaea34e334a314224f21ff5681685))

# [1.3.0](https://github.com/json-schema-tools/transpiler/compare/1.2.1...1.3.0) (2020-07-21)


### Features

* all tests passing with new newnew ([5e2a135](https://github.com/json-schema-tools/transpiler/commit/5e2a135196a39060e93761713f2a3ccd78728e5f))

## [1.2.1](https://github.com/json-schema-tools/transpiler/compare/1.2.0...1.2.1) (2020-07-20)


### Bug Fixes

* add mode docs ([82d2774](https://github.com/json-schema-tools/transpiler/commit/82d277411906d9867aa8d27468e45b524be956c0))

# [1.2.0](https://github.com/json-schema-tools/transpiler/compare/1.1.0...1.2.0) (2020-07-20)


### Bug Fixes

* all unit tests passing ([15cb174](https://github.com/json-schema-tools/transpiler/commit/15cb174fa8d910424aaa1efcca11bae6a0932e9c))
* almost there... ([0f5db50](https://github.com/json-schema-tools/transpiler/commit/0f5db5041fdf458ee4d3a356bb2b50bfc1c44767))
* broken test and extra garbage log ([65739ff](https://github.com/json-schema-tools/transpiler/commit/65739ff355159d5f67907517d40f238a36174838))
* getting close to being the best in the world ([31b9168](https://github.com/json-schema-tools/transpiler/commit/31b9168253ba8a80a2c04ea146dc3938757c796a))
* oh my god its alive ([cd0b386](https://github.com/json-schema-tools/transpiler/commit/cd0b38693cab2755a149e4579ce5f2f907c9509c))
* things looking good ([36e4b1f](https://github.com/json-schema-tools/transpiler/commit/36e4b1f5a5d7d591c88146b2161d97086318bf2e))
* update package lock after rebase ([5692401](https://github.com/json-schema-tools/transpiler/commit/5692401b32cbbb561fb92bf1ce735a22544663b7))
* wip wip ([a92df4a](https://github.com/json-schema-tools/transpiler/commit/a92df4a8edee6bb9705d14da470ca57272e4dc76))


### Features

* fuck yeah boys!! ([a125582](https://github.com/json-schema-tools/transpiler/commit/a12558237b660f7fb95e3914525b4281d955406e))
* referencer ownage ([469f8db](https://github.com/json-schema-tools/transpiler/commit/469f8dbc23e310a9a14667c55a75e7846647cb90))

# [1.1.0](https://github.com/json-schema-tools/transpiler/compare/1.0.1...1.1.0) (2020-07-02)


### Bug Fixes

* all green baby! ([75ee5f4](https://github.com/json-schema-tools/transpiler/commit/75ee5f4109813a8a654be9f14492107a5612aa37))
* update dereferencer ([af4db1b](https://github.com/json-schema-tools/transpiler/commit/af4db1b06c44d0a76322f353afe07071fdc5ee35))


### Features

* integrate new traverse ([8227adb](https://github.com/json-schema-tools/transpiler/commit/8227adb50977eb1276a5c501c06ce3c098df25ed))

## [1.0.1](https://github.com/json-schema-tools/transpiler/compare/1.0.0...1.0.1) (2020-06-30)


### Bug Fixes

* fix deps ([7d44dd3](https://github.com/json-schema-tools/transpiler/commit/7d44dd30c58ac18d57b255b05032300cee61437f))
* update packages and typings ([c243795](https://github.com/json-schema-tools/transpiler/commit/c2437959a953f51acd4629022802e0f52d18a9ad))
* use our own dereffer ([2552a11](https://github.com/json-schema-tools/transpiler/commit/2552a11dd919c80dd20f581f8969af2f5e236008))

# 1.0.0 (2020-06-25)


### Bug Fixes

* set pacakge name appropriately ([385142b](https://github.com/json-schema-tools/transpiler/commit/385142b93ba0c95e3fb0ab1ce7fa795ffdb15aa3))
* spice up the readme a little ([dd432e8](https://github.com/json-schema-tools/transpiler/commit/dd432e8b3b88feca7f4170ac427aa3989fea1761))
* typedoc working ([98ef1c8](https://github.com/json-schema-tools/transpiler/commit/98ef1c83816a93b354c70b528c3b7c3be043d4f5))
* update readme more ([0849bef](https://github.com/json-schema-tools/transpiler/commit/0849bef4e4064a5befe1a19b41f925c9f2db20bd))


### Features

* test all passing now ([53f752a](https://github.com/json-schema-tools/transpiler/commit/53f752a4f0bb3eff5f0f8c48df63b0ab6b6fbb72))
