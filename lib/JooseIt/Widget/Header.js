Class('JooseIt.Widget.Header', {
    
    isa : Ext.Container,
    
    use : [ 
        {
            type        : 'javascript',
            token       : 'JooseIt/static/deps/raphael-min-1.5.0.js',
            presence    : function () { return window.Raphael }
        }, 
        'JooseIt.Control.NavigationButton' 
    ],
    
    has : {
        style                   : 'position : relative',
        
        canvas                  : null,
        
        buttons                 : Joose.I.Object,
        
        activeButton            : null
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var canvas = this.canvas = Raphael(this.el.dom, '100%', '100%')
            
            var buttons         = this.buttons
            var urls            = JOOSE_IT_BUTTONS
            
            var title           = canvas.image(urls.logo.src, 352, 10, 276, 50)
            
            
            buttons.home        = new JooseIt.Control.NavigationButton({
                src         : urls.home.src,
                activeSrc   : urls.home.activeSrc,
                
                dispatchTo  : '/home',
                
                left        : 45,
                top         : 50,
                
                rotation    : 20,
                
                canvas      : canvas
            })

            
            buttons.about       = new JooseIt.Control.NavigationButton({
                src         : urls.about.src,
                activeSrc   : urls.about.activeSrc,
                
                dispatchTo  : '/about',
                
                left        : 215,
                top         : 90,
                
                rotation    : -18,
                
                canvas      : canvas
            })            
            
            
            buttons.download    = new JooseIt.Control.NavigationButton({
                src         : urls.download.src,
                activeSrc   : urls.download.activeSrc,
                
                dispatchTo  : '/download',
                
                left        : 385,
                top         : 110,
                
                rotation    : 0,
                
                canvas      : canvas
            })
            
            
            buttons.blog       = new JooseIt.Control.NavigationButton({
                src         : urls.blog.src,
                activeSrc   : urls.blog.activeSrc,
                
                dispatchTo  : function () {
                    window.location = '/blog'
                },
                
                left        : 555,
                top         : 90,
                
                rotation    : 21,
                
                canvas      : canvas
            })
            
            
            buttons.resources       = new JooseIt.Control.NavigationButton({
                src         : urls.resources.src,
                activeSrc   : urls.resources.activeSrc,
                
                dispatchTo  : '/resources',
                
                left        : 725,
                top         : 40,
                
                rotation    : -20,
                
                canvas      : canvas
            })
            
            buttons.about.self.insertBefore(buttons.home.self)
            
            if (this.activeButton) {
                var activeButton = this.activeButton = buttons[this.activeButton]
                activeButton.activate()
            }
            

            Joose.O.each(this.buttons, function (button) {
                button.on('mouseover', button.scale.createDelegate(button, []))
                button.on('mouseover', this.backscaleButtonsExcept, this)
                
                button.on('mouseout', this.restoreAllScales, this)
            }, this)
        }
        
    },
    
    
    methods : {
        
        backscaleButtonsExcept : function (event) {
            Joose.O.each(this.buttons, function (otherButton) {
                if (otherButton != event.source) otherButton.backscale()
            })
        },
        
        
        restoreAllScales : function () {
            Joose.O.each(this.buttons, function (button) {
                button.restoreScale()
            })
        },
        
        
        setActivePage : function (pageId) {
            if (!this.rendered) {
                this.activeButton = pageId
                
                return
            }
            
            if (this.activeButton) this.activeButton.deactivate()
            
            this.activeButton = this.buttons[pageId]
            
            this.activeButton.activate()
        }
        
    }
    
})