[FireSize](http://addons.heroku.com/firesize) let's you resize images on the
fly with just a simple HTTP request.

You can resize and convert images without any configuration, background
processes or even any code. We support a bunch of resizing options as well as
conversions from and to a number of image formats. And, we even provide a CDN
to cache resized images all for free.

## Provisioning the add-on

FireSize can be attached to a Heroku application via the  CLI:

> callout
> A list of all plans available can be found [pricing page](http://addons.heroku.com/firesize).

```term
$ heroku addons:add firesize
-----> Adding firesize to sharp-mountain-4005... done, v18 (free)
```

Once FireSize has been added a `FIRESIZE_URL` setting will be available in the
app configuration and will contain the your unique firesize url used for image
resizing. This can be confirmed using the `heroku config:get` command.

```term
$ heroku config:get FIRESIZE_URL
https://j29fjskei39d.firesize.com
```

After installing FireSize you can go ahead and start using the just by altering
your image urls.

## Getting Started

Here's what most of your new image urls will look like. We've prepended a
the firesize url and some resizing and configuration options.

`<img src="https://j29fjskei39d.firesize.com/500x300/g_center/https://imgur.com/28h4fh34">`

We also support image format conversion. Here's an example of converting the
first frame of a gif to a png.

`<img src="https://j29fjskei39d.firesize.com/500x300/g_center/png/frame_0/https://imgur.com/28h4fh34.gif">`

### Using the Environment Variables

Below are some examples of using the <code>FIRESIZE_URL</code> with popular
templating languages.

Erb:

`<img src="<%= ENV['FIRESIZE_URL'] %>/500x300/g_center/https://imgur.com/28h4fh34">`

Ejs:

`<img src="<%= process.env.FIRESIZE_URL %>/500x300/g_center/https://imgur.com/28h4fh34">`

Jinja2:

`<img src="{{os.environ['FIRESIZE_URL']}}/500x300/g_center/https://imgur.com/28h4fh34">`

## Monitoring & Logging

FireSize activity can be observed within the Heroku log-stream by [[describe add-on logging recognition, if any]].

```term
$ heroku logs -t | grep 'firesize pattern'
```

## Dashboard

> callout
> For more information on the features available within the FireSize dashboard please see the docs at [https://firesize.com/docs](https://firesize.com/docs).

You can also view your current usage information, configure your domain, or
even whitelist specific image source locations. Visit our dashboard by visiting
the [Heroku Dashboard](https://dashboard.heroku.com/apps) and clicking on
FireSize in your app's addon list.

## Migrating between plans

> note
> Application owners should carefully manage the migration timing to ensure proper application function during the migration process.

Use the `heroku addons:upgrade` command to migrate to a new plan.

```term
$ heroku addons:upgrade firesize:premium
-----> Upgrading firesize:premium to sharp-mountain-4005... done, v18 ($100/mo)
       Your plan has been updated to: firesize:premium
```

## Removing the add-on

FireSize can be removed via the  CLI.

> warning
> This will destroy all associated data and cannot be undone!

```term
$ heroku addons:remove firesize
-----> Removing firesize from sharp-mountain-4005... done, v20 (free)
```

## Support

All FireSize support and runtime issues should be submitted via one of the
[Heroku Support channels](support-channels). Any non-support related issues or
product feedback is welcome at
[patrick@firesize.com](mailto:patrick@firesize.com).
