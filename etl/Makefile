CURL_BIN               = /usr/bin/curl
PERL_BIN               = /usr/bin/perl
PERL_LOCAL             = ./perl
CPANMINUS              = https://cpanmin.us
CPANM_BIN              = $(PERL_LOCAL)/bin/cpanm
PERLTIDY               = $(PERL_LOCAL)/bin/perltidy
INCLUDE                = $(PERL_LOCAL)/lib/perl5

CPANM := $(PERL_BIN) $(CPANM_BIN) \
  --local-lib=$(PERL_LOCAL) \
	--self-contained \
	--prompt

$(CPANM_BIN) :
	@echo "Installing CPANM ..."
	$(CURL_BIN) -L $(CPANMINUS) | $(PERL_BIN) - --local-lib=$(PERL_LOCAL) local::lib && eval $(perl -I $(PERL_LOCAL)/lib/perl5 -Mlocal::lib=$(PERL_LOCAL))
	$(CURL_BIN) -L $(CPANMINUS) | $(PERL_BIN) - --local-lib=$(PERL_LOCAL) App::cpanminus

build : $(CPANM_BIN)
	@echo "Building CPAN packages ..."
	$(CPANM) --notest --installdeps -q .

develop : $(CPANM_BIN)
	@echo "Building CPAN packages ..."
	$(CPANM) --notest --installdeps -q --with-develop .

tidy : develop
	@echo "Perl tidying scripts ..."
	$(PERL_BIN) -I$(INCLUDE) -Mlocal::lib $(PERLTIDY) -b -bext='/' *.pl
