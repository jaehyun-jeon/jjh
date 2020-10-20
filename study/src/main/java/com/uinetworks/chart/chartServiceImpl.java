package com.uinetworks.chart;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class chartServiceImpl implements chartService {

	@Autowired
	chartDao dao;
	
	public List<chartVo> getChartData() {

		return dao.getChartData();
	}
	
}
