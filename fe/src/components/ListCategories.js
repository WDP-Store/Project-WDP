import React from 'react';

const TopCategories = () => {
  return (
    <div className="brands-block">
      <div className="container">
        <div className="halo-block-header text-center viewAll--right">
          <h3 className="title">
            <span className="text">Top Categories</span>
          </h3>
          <a
            className="view_all has-border"
            role="link"
            aria-disabled="true"
            title="Shop All"
            style={{
              '--font-weight-view-all-style': 400,
              '--mg-bottom-view-style': '30px',
              '--color-view-all-style': '#3c3c3c',
              '--color-view-all-icon-style': '#eb492f'
            }}
          >
            <span className="icon-svg"></span>Shop All
          </a>
        </div>
        <brand-tab className="brand__custom--tab">
          <div className="tab-panel-content">
            <div className="tab-content--block active text-center" id="block-af6f1683-8fcc-4b44-8f84-caaa88774274">
              <div className="halo-row column-6 sm-column-2 md-column-3" style={{ '--items-grid-gap-style': '-5px' }}>
                {/* Map through categories */}
                {categories.map((category, index) => (
                  <div key={index} className="halo-item" style={{ '--items-grid-gap-style': '5px' }}>
                    <div
                      className="wrapper-item has-content"
                      style={{
                        '--items-spacing-tb-style': '0px',
                        '--items-spacing-lr-style': '0px',
                        '--items-bg-color-style': '#ffffff',
                        '--items-border-color-style': '#ffffff',
                        '--items-border-radius-style': '100px',
                        '--image-border-radius-style': '0%',
                        '--image-max-width-style': '170px',
                        '--image-min-height-style': '15px'
                      }}
                    >
                      <div className="wrapper-image">
                        <a title={category.title} href={category.link} className="image-zoom">
                          <img
                            data-srcset={category.imageSrc}
                            alt={category.title}
                            className="ls-is-cached lazyloaded"
                            srcSet={category.imageSrc}
                          />
                          <span className="data-lazy-loading"></span>
                        </a>
                      </div>
                      <div className="wrapper-content">
                        <a
                          className="btb-title"
                          href={category.link}
                          title={category.title}
                          style={{
                            '--fontsize-title-style': '16px',
                            '--fontweight-title-style': 400,
                            '--title-color-style': '#202020',
                            '--title-color-hover-style': '#0a6cdc'
                          }}
                        >
                          <span>{category.title}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                aria-label="Show More"
                className="btn button hidden-lg hidden-desktop"
                data-load-more-block=""
                data-buttonmore="Show More"
                data-buttonless="Show Less"
                data-rowlg="12"
                data-results="12"
              >
                <span>Show More</span>
              </button>
            </div>
          </div>
        </brand-tab>
      </div>
    </div>
  );
};

export default TopCategories;
