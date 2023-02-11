FROM jekyll/jekyll:latest
WORKDIR /usr/src/app

EXPOSE 4000

COPY ./rap-landing-page ./

ENV JEKYLL_ENV=production

RUN touch Gemfile.lock 
RUN chmod a+w Gemfile.lock
RUN mkdir .jekyll-cache 
RUN mkdir _site 
RUN bundle install
CMD ["jekyll", "serve"]
