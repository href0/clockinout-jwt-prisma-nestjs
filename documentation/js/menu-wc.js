'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">first-nest documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-1bc9c0b930d3f2be3db17cfcf880b6629bea32adbe9a3c8ddd8f4c1389e2cfb51f1b6e25a1d5ae25aba92d3256cf03a7047e1ffb32401bf40f251d85115762b1"' : 'data-bs-target="#xs-controllers-links-module-AppModule-1bc9c0b930d3f2be3db17cfcf880b6629bea32adbe9a3c8ddd8f4c1389e2cfb51f1b6e25a1d5ae25aba92d3256cf03a7047e1ffb32401bf40f251d85115762b1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-1bc9c0b930d3f2be3db17cfcf880b6629bea32adbe9a3c8ddd8f4c1389e2cfb51f1b6e25a1d5ae25aba92d3256cf03a7047e1ffb32401bf40f251d85115762b1"' :
                                            'id="xs-controllers-links-module-AppModule-1bc9c0b930d3f2be3db17cfcf880b6629bea32adbe9a3c8ddd8f4c1389e2cfb51f1b6e25a1d5ae25aba92d3256cf03a7047e1ffb32401bf40f251d85115762b1"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-1bc9c0b930d3f2be3db17cfcf880b6629bea32adbe9a3c8ddd8f4c1389e2cfb51f1b6e25a1d5ae25aba92d3256cf03a7047e1ffb32401bf40f251d85115762b1"' : 'data-bs-target="#xs-injectables-links-module-AppModule-1bc9c0b930d3f2be3db17cfcf880b6629bea32adbe9a3c8ddd8f4c1389e2cfb51f1b6e25a1d5ae25aba92d3256cf03a7047e1ffb32401bf40f251d85115762b1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1bc9c0b930d3f2be3db17cfcf880b6629bea32adbe9a3c8ddd8f4c1389e2cfb51f1b6e25a1d5ae25aba92d3256cf03a7047e1ffb32401bf40f251d85115762b1"' :
                                        'id="xs-injectables-links-module-AppModule-1bc9c0b930d3f2be3db17cfcf880b6629bea32adbe9a3c8ddd8f4c1389e2cfb51f1b6e25a1d5ae25aba92d3256cf03a7047e1ffb32401bf40f251d85115762b1"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-ca0e436b3f27eb68658aeec662a67b709870c7601915d4844ef84a4a2da1518278c0ad9694f53d528919e95b45fc4b2e0c012c98b166f0ae4143a17b2c7559dd"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-ca0e436b3f27eb68658aeec662a67b709870c7601915d4844ef84a4a2da1518278c0ad9694f53d528919e95b45fc4b2e0c012c98b166f0ae4143a17b2c7559dd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-ca0e436b3f27eb68658aeec662a67b709870c7601915d4844ef84a4a2da1518278c0ad9694f53d528919e95b45fc4b2e0c012c98b166f0ae4143a17b2c7559dd"' :
                                            'id="xs-controllers-links-module-AuthModule-ca0e436b3f27eb68658aeec662a67b709870c7601915d4844ef84a4a2da1518278c0ad9694f53d528919e95b45fc4b2e0c012c98b166f0ae4143a17b2c7559dd"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-ca0e436b3f27eb68658aeec662a67b709870c7601915d4844ef84a4a2da1518278c0ad9694f53d528919e95b45fc4b2e0c012c98b166f0ae4143a17b2c7559dd"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-ca0e436b3f27eb68658aeec662a67b709870c7601915d4844ef84a4a2da1518278c0ad9694f53d528919e95b45fc4b2e0c012c98b166f0ae4143a17b2c7559dd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ca0e436b3f27eb68658aeec662a67b709870c7601915d4844ef84a4a2da1518278c0ad9694f53d528919e95b45fc4b2e0c012c98b166f0ae4143a17b2c7559dd"' :
                                        'id="xs-injectables-links-module-AuthModule-ca0e436b3f27eb68658aeec662a67b709870c7601915d4844ef84a4a2da1518278c0ad9694f53d528919e95b45fc4b2e0c012c98b166f0ae4143a17b2c7559dd"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-ae752998392f20fcb728e47b45ec13e3426c664e536e6cc0de8c115709d098cf5430f60b705765c5cf542c011f7a6206b5a1a3ecf25d1b5821844d665fe19303"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-ae752998392f20fcb728e47b45ec13e3426c664e536e6cc0de8c115709d098cf5430f60b705765c5cf542c011f7a6206b5a1a3ecf25d1b5821844d665fe19303"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-ae752998392f20fcb728e47b45ec13e3426c664e536e6cc0de8c115709d098cf5430f60b705765c5cf542c011f7a6206b5a1a3ecf25d1b5821844d665fe19303"' :
                                        'id="xs-injectables-links-module-PrismaModule-ae752998392f20fcb728e47b45ec13e3426c664e536e6cc0de8c115709d098cf5430f60b705765c5cf542c011f7a6206b5a1a3ecf25d1b5821844d665fe19303"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductModule-b371ad63a6603af027bf7ab220cba143e3314de3545bb3d19bf2c23c63ea9d916605dcb2f6e5f5e66bb3947493192886350e19f3adc799d52fc8200c1083f978"' : 'data-bs-target="#xs-controllers-links-module-ProductModule-b371ad63a6603af027bf7ab220cba143e3314de3545bb3d19bf2c23c63ea9d916605dcb2f6e5f5e66bb3947493192886350e19f3adc799d52fc8200c1083f978"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-b371ad63a6603af027bf7ab220cba143e3314de3545bb3d19bf2c23c63ea9d916605dcb2f6e5f5e66bb3947493192886350e19f3adc799d52fc8200c1083f978"' :
                                            'id="xs-controllers-links-module-ProductModule-b371ad63a6603af027bf7ab220cba143e3314de3545bb3d19bf2c23c63ea9d916605dcb2f6e5f5e66bb3947493192886350e19f3adc799d52fc8200c1083f978"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-b371ad63a6603af027bf7ab220cba143e3314de3545bb3d19bf2c23c63ea9d916605dcb2f6e5f5e66bb3947493192886350e19f3adc799d52fc8200c1083f978"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-b371ad63a6603af027bf7ab220cba143e3314de3545bb3d19bf2c23c63ea9d916605dcb2f6e5f5e66bb3947493192886350e19f3adc799d52fc8200c1083f978"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-b371ad63a6603af027bf7ab220cba143e3314de3545bb3d19bf2c23c63ea9d916605dcb2f6e5f5e66bb3947493192886350e19f3adc799d52fc8200c1083f978"' :
                                        'id="xs-injectables-links-module-ProductModule-b371ad63a6603af027bf7ab220cba143e3314de3545bb3d19bf2c23c63ea9d916605dcb2f6e5f5e66bb3947493192886350e19f3adc799d52fc8200c1083f978"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-0ebb070004196ce0b6faba8518c3e31463fbc8087c0a3992433384253802779436384a4d9258f909998e899fce7bfa15adf9f9c38eef0ce02e1e78fbc0ab52b8"' : 'data-bs-target="#xs-controllers-links-module-UserModule-0ebb070004196ce0b6faba8518c3e31463fbc8087c0a3992433384253802779436384a4d9258f909998e899fce7bfa15adf9f9c38eef0ce02e1e78fbc0ab52b8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-0ebb070004196ce0b6faba8518c3e31463fbc8087c0a3992433384253802779436384a4d9258f909998e899fce7bfa15adf9f9c38eef0ce02e1e78fbc0ab52b8"' :
                                            'id="xs-controllers-links-module-UserModule-0ebb070004196ce0b6faba8518c3e31463fbc8087c0a3992433384253802779436384a4d9258f909998e899fce7bfa15adf9f9c38eef0ce02e1e78fbc0ab52b8"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-0ebb070004196ce0b6faba8518c3e31463fbc8087c0a3992433384253802779436384a4d9258f909998e899fce7bfa15adf9f9c38eef0ce02e1e78fbc0ab52b8"' : 'data-bs-target="#xs-injectables-links-module-UserModule-0ebb070004196ce0b6faba8518c3e31463fbc8087c0a3992433384253802779436384a4d9258f909998e899fce7bfa15adf9f9c38eef0ce02e1e78fbc0ab52b8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-0ebb070004196ce0b6faba8518c3e31463fbc8087c0a3992433384253802779436384a4d9258f909998e899fce7bfa15adf9f9c38eef0ce02e1e78fbc0ab52b8"' :
                                        'id="xs-injectables-links-module-UserModule-0ebb070004196ce0b6faba8518c3e31463fbc8087c0a3992433384253802779436384a4d9258f909998e899fce7bfa15adf9f9c38eef0ce02e1e78fbc0ab52b8"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ProductController.html" data-type="entity-link" >ProductController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterUserDto.html" data-type="entity-link" >FilterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pagination.html" data-type="entity-link" >Pagination</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInAuthDto.html" data-type="entity-link" >SignInAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePasswordUserDto.html" data-type="entity-link" >UpdatePasswordUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link" >UpdateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link" >ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Links.html" data-type="entity-link" >Links</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});