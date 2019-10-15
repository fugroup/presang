const { h, q, qa } = require('presang')

module.exports = async function (page) {
  return [
    h('!doctype', null, { html: true }),
    h('html', '', {}, [
      h('head', '', {}, [
        h('meta', null, { 'http-equiv': 'content-type', content: 'text/html; charset=utf-8' }),
        h('title', page.title || 'Untitled'),
        h('link', null, { rel: 'stylesheet', href: '/app.css', type: 'text/css' }),
        h('script', h),
        h('script', q),
        h('script', qa)
      ]),
      h('body', '', {}, [
        h('section', '', {}, [
          h('nav', '', {}, [
            h('a', 'home', { href: '/' }),
            h('a', 'about', { href: '/about.html' })
          ]),
          h('main', '', {}, await page.render())
        ]),
        h('script', function activeLink () {
          var a = q(`nav a[href='${location.pathname}']`) || q('nav a')
          a.classList.add('active-link')
        }),
        h('script', 'activeLink()')
      ])
    ])
  ].join('')
}