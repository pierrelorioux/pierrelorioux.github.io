Create table aggregate_AI as SELECT  
		ReportingPeriod.date1,
		ReportingPeriod.date2,
		Location.Name as location,
		Location.Axe as Pcode,
		IndicatorValue.Value,
		Indicator.Name as Ind_name,
		Indicator.Units as units,
		Activity.Name as activity,
		Partner.Name as partner
		--ReportingPeriod.ReportingPeriodId,
		--ReportingPeriod.SiteId,
		--Site.SiteId,
		--Site.LocationId,
		--Site.PartnerId,
		--Site.ActivityId,
		--Indicator.IndicatorId
	FROM IndicatorValue 
		left outer join ReportingPeriod ON  ReportingPeriod.ReportingPeriodId = IndicatorValue.ReportingPeriodId 
		left outer join Site ON  Site.SiteId = ReportingPeriod.SiteId
		left outer join Location ON Location.LocationID = Site.LocationId
		left outer join Partner ON Partner.PartnerId = Site.PartnerId
		left outer join Activity ON Activity.ActivityId = Site.ActivityId
		left outer join Indicator ON Indicator.IndicatorId = IndicatorValue.IndicatorId