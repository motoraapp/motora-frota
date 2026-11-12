# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 12/11/2026, 18:57:38. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (8650 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- Gera o QR code do Pix a partir do copia e cola -->
24: <!-- Supabase (banco de dados online) -->
140: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
145: <!-- Header Principal -->
159: <!-- Controles do Header -->
161: <!-- Botão Status Online/Offline (Motorista) -->
169: <!-- Ativar Notificações -->
174: <!-- Temas -->
179: <!-- Logout Button -->
188: <!-- Conteúdo Principal -->
191: <!-- TELA DE LOGIN -->
192: #secLogin
225: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
226: #secDemoEscolha
241: <!-- PAINEL DO MOTORISTA -->
242: #secDriverPanel
244: <!-- Card do Veículo Vinculado -->
258: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
268: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
273: <!-- Aviso: nova versão do app Android -->
276: <!-- Aviso vermelho: notificações desligadas -->
279: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
283: <!-- Aviso de Pix / pagamento pendente -->
286: <!-- Navegação de Abas -->
304: <!-- Conteúdo das Abas Motorista -->
307: <!-- Aba CRLV-e -->
308: #tabDrvCrlv
313: <!-- Renderizado dinamicamente -->
317: <!-- Aba Contrato -->
318: #tabDrvContract
328: <!-- Renderizado dinamicamente -->
332: <!-- Aba Vistoria -->
333: #tabDrvInspection
340: <!-- Aba Pagamento -->
341: #tabDrvPayment
354: <!-- Caução e multas do motorista -->
356: <!-- Valor e descrição da cobrança -->
366: <!-- Seção Pix -->
380: <!-- QR Code Renderizado aqui -->
413: <!-- Seção Upload de Comprovante -->
430: <!-- Lista de comprovantes -->
435: <!-- Recibos quando o contrato está encerrado -->
442: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
443: #secMasterPanel
477: <!-- Aviso: falta criar a tabela dos termos no banco -->
480: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
482: <!-- Lista de Veículos -->
498: <!-- Renderizado via JS -->
505: <!-- Form de Adicionar Veículo -->
539: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
545: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
550: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
555: <!-- Fichas Arquivadas (após marcar caução pago) -->
564: <!-- Form de Adicionar Motorista -->
659: <!-- Barra de baixo do dono (só no design novo) -->
669: <!-- MODAL PRIMEIRO LOGIN -->
670: #modalFirstLogin
704: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
705: #modalNotif
718: <!-- MODAL VISTORIA (MASTER) -->
719: #modalInspection
732: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
733: #modalSettings
824: <!-- MODAL TEMAS -->
825: #modalThemes
836: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
837: #modalCreds
852: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
867: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
868: #modalDriverFile
908: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
937: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
952: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
994: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
995: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
996: #modalRecibo
1015: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1016: #modalPixArea
1032: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1033: #modalIA
1115: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1116: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1117: #modalEditVeh
1136: #modalSenha
1158: #modalMeusRecibos
1176: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1177: #modalEmail
1197: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1198: #modalReport
1213: #modalFinCardDetail
1226: #modalFinance
1259: <!-- FILTROS -->
1309: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1329: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1330: #modalExpenses
1365: <!-- MODAL NOVO PIX -->
1366: #modalNewPix
1418: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1476: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1477: #modalCorrigirRecibo
1491: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1492: #modalDocViewer
1500: #modalDocBody
1501: <!-- Conteúdo pré-visualizado -->
1507: #modalTerms
1521: <!-- NOTIFICAÇÕES TOAST -->
1538: lsGet()
1539: lsSet()
1540: lsDel()
1563: demoLoginRole()
1567: demoId()
1568: demoSave()
1569: demoSaved()
1571: *datas no horário de Brasília*
1572: demoLocal()
1573: demoParts()
1574: demoDay()
1575: demoNextDue()
1580: *dados fictícios (4 meses)*
1581: demoBuild()
1724: *documentos fictícios (imagem gerada na hora)*
1725: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1726: demoDocBlob()
1804: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1805: demoQuery()
1828: out()
1834: run()
1875: demoOnUpdate()
1885: demoOnInsert()
1986: demoClient()
2051: demoStart()
2059: demoStop()
2065: abrirDemo()
2072: trocarDemo()
2077: demoBanner()
2092: toEmail()
2096: showLogin()
2100: esc()
2105: dataHoraBR()
2113: uiDialogo()
2161: uiConfirm()
2170: uiPrompt()
2176: friendlyError()
2186: devicePrefs()
2189: saveDevicePrefs()
2192: docRef()
2193: viewDocIdx()
2195: setBusy()
2233: **TEMAS**
2242: currentTheme()
2247: applyTheme()
2248: openThemes()
2258: pickTheme()
2264: toggleDarkMode()
2266: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2268: loadDesignCfg()
2275: applyDesign()
2292: markMasterNav()
2297: fillDesignCfg()
2302: saveDesign()
2316: showToast()
2325: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2326: senhaErro()
2327: abrirSenha()
2336: salvarIaCodigo()
2346: fecharSenha()
2347: salvarSenha()
2368: loginUserInput()
2373: loginErro()
2377: verSenha()
2382: handleLogin()
2431: logout()
2450: saveFirstLoginPreferences()
2473: carregarDados()
2496: aplicarDados()
2519: loadAndRender()
2546: autoRefresh()
2585: markUpdated()
2590: reload()
2595: renderApp()
2643: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2646: masterBack()
2648: viewAsDriver()
2670: exitViewAs()
2689: viewOnly()
2690: renderViewAsBanner()
2700: showSection()
2705: withBtn()
2713: toggleDriverStatus()
2722: isOnline()
2724: updateStatusToggleUI()
2737: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2746: checkApkUpdate()
2761: updateInstallApkButton()
2781: renderDriverPanel()
3006: switchDriverTab()
3021: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3024: parsePixKey()
3028: normalizePixKey()
3036: pixKeyLooksOk()
3044: togglePixKeyFields()
3050: updatePixKeyPlaceholder()
3056: copyPixKey()
3063: copyPixCode()
3075: receiptBadge()
3085: receiptMasterBox()
3112: receiptAction()
3119: confirmReceipt()
3132: rejectReceipt()
3144: recheckReceipt()
3153: uploadReceipt()
3176: switchMasterTab()
3193: maskPhone()
3202: waLink()
3207: allVeh()
3208: allDrv()
3209: chargeVehicleId()
3221: enviarPedidoParcialAsaas()
3237: pedirPixParcial()
3255: restaurarPixTotal()
3261: responderPixParcial()
3285: contrato30Info()
3315: encerrarContrato()
3332: encerrarContratoPrompt()
3345: reativarContrato()
3369: marcarCaucaoPagoArquivar()
3390: desarquivarFicha()
3408: deliveryInspectionHtml()
3438: uploadDeliveryPhotos()
3465: delDeliveryPhoto()
3483: addCauDesconto()
3508: puxarMultaCaucao()
3529: delCauDesconto()
3551: dfCauDescontosHtml()
3584: dfContratoRender()
3628: encerrarContratoConfirmFicha()
3635: renderMasterPanel()
3786: renderArchivedDrivers()
3831: handleAddVehicle()
3864: deleteVehicle()
3865: cancelDeleteVehicle()
3867: confirmDeleteVehicle()
3891: abrirEditarVeiculo()
3910: fecharEditarVeiculo()
3911: salvarEditarVeiculo()
3941: drvCauMostra()
3948: drvCauLer()
3956: handleAddDriver()
4034: marcarSituacao()
4044: updateDriverPaymentStatus()
4053: deleteDriver()
4054: cancelDeleteDriver()
4056: confirmDeleteDriver()
4079: prepareFile()
4101: uploadFile()
4112: fileUrl()
4123: downloadName()
4127: renderFilePreview()
4147: renderPdfToCanvas()
4174: viewDoc()
4195: **DINHEIRO**
4196: parseMoney()
4203: fmtMoney()
4204: fmtDate()
4205: todayISO()
4207: **CONFIGURAÇÕES (Gemini e Google Drive)**
4209: loadConfigStatus()
4214: paintConfig()
4219: fillOwnerVehicleSelect()
4225: saveOwnerVehicle()
4247: openSettings()
4260: closeSettings()
4261: saveConfig()
4271: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
4272: renderAsaasDrivers()
4299: toggleDriverAsaas()
4331: loadAsaasInfo()
4345: saveAsaas()
4353: testarAsaas()
4360: copiarAsaas()
4364: testDrive()
4371: resyncDrive()
4379: **FICHA DO MOTORISTA**
4382: openDriverFile()
4412: closeDriverFile()
4414: saveDriverFile()
4470: aiFillDriver()
4509: **CONTROLE FINANCEIRO**
4510: finRange()
4527: dayBR()
4528: inRange()
4530: onFinPeriodChange()
4536: fillFinFilters()
4544: clearFinFilters()
4548: updateFinFilterCount()
4557: openFinance()
4563: switchFinTab()
4574: finCardBtn()
4582: closeFinCardDetail()
4583: closeFinance()
4585: collectRentFinData()
4636: renderFinance()
4694: openFinCardDetail()
4901: openFinExtrato()
4995: renderFinExtratoView()
5076: openFinExtratoReport()
5093: renderFinGrafico()
5113: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
5115: okEmail()
5117: openEmailCompose()
5138: closeEmailCompose()
5139: sendEmailCompose()
5154: emailRecibo()
5159: emailIA()
5167: **RELATÓRIO DO FINANCEIRO**
5169: finFiltersText()
5174: finPeriodText()
5181: buildReportHtml()
5203: openFinReport()
5213: closeFinReport()
5214: printFinReport()
5218: shareFinReport()
5228: emailFinReport()
5234: **DESPESAS DO VEÍCULO**
5236: openExpenses()
5248: closeExpenses()
5249: fillExpenseTypes()
5254: createExpenseType()
5269: aiReadExpense()
5301: renderExpenses()
5323: saveExpense()
5350: deleteExpense()
5375: photoCard()
5404: inspectionHtml()
5430: hydrateImages()
5436: openInspection()
5444: closeInspection()
5448: renderInspectionModal()
5455: uploadInspection()
5486: deleteInspectionPhoto()
5506: fmtDue()
5512: nextDueLocal()
5523: openNewPix()
5553: **CAUÇÃO DO MOTORISTA**
5554: cauOf()
5555: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
5556: devOf()
5557: devCobrancas()
5559: devPrevisao()
5567: dfDevRender()
5594: dfDevIr()
5595: dfDevSalvar()
5600: dfDevAvisar()
5606: dfDevDesfazer()
5610: dfDevReceber()
5619: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
5623: cauPlano()
5631: cauParcela()
5638: cauParcelasTexto()
5642: cauNext()
5649: dfCauFill()
5659: dfCauCalc()
5687: dfCauRead()
5700: expTypeName()
5704: driverFinVehicleId()
5716: cauEntradaItem()
5730: cauPagoDespesaItem()
5745: **CAUÇÃO: quanto já foi pago**
5747: cauStatus()
5757: obsResumoHtml()
5758: cauResumoHtml()
5763: **MULTAS E OUTRAS DESPESAS**
5764: multasOf()
5766: multaPagaAuto()
5771: multasAbertas()
5772: multasPendentes()
5773: multasResumoHtml()
5781: cobOf()
5782: dfCobFill()
5788: dfCobRead()
5791: dfCobInfo()
5801: cobResumoHtml()
5805: ajustesOf()
5809: ajusteVale()
5810: isoDia()
5812: vencProxima()
5813: previsaoProxima()
5827: previsaoHtml()
5831: dfAjRender()
5837: addAjuste()
5846: delAjuste()
5851: abrirAjustes()
5852: renderProxCobrancas()
5858: savePixExtra()
5866: dfMultFill()
5874: fdPaga()
5875: dfMultRender()
5884: toggleMultas()
5891: addMulta()
5901: delMulta()
5909: multaPaga()
5918: renderDriverExtras()
5946: mondayAfter()
5954: renderDriverProfileExtras()
6020: semanaDoPix()
6026: **MEUS RECIBOS (área do motorista)**
6028: meusRecibosLista()
6032: reciboRowHtml()
6040: renderEncerradoRecibos()
6045: openMeuReciboDireto()
6046: openMeusRecibos()
6053: closeMeusRecibos()
6054: reciboPdfHtml()
6065: verMeuRecibo()
6072: voltarMeusRecibos()
6073: pdfMeuRecibo()
6077: shareMeuRecibo()
6086: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
6087: editVehicleRent()
6104: nextParcel()
6110: fillNewPixValues()
6146: newPixParts()
6177: **PERÍODO E VENCIMENTO DA COBRANÇA**
6178: dataISO()
6179: dataDe()
6180: dataMais()
6181: dataBR()
6182: diasEntre()
6183: isoSP()
6184: pixPeriodo()
6191: pixDesc()
6192: pixDiasPeriodo()
6197: marcarAjustesPorVenc()
6202: pixDatasNovo()
6211: pixDatasMudou()
6222: pixAluguelProporcional()
6230: pixPeriodoInfo()
6243: pixAddLinha()
6250: pixLinhas()
6252: descSoma()
6262: calcNewPix()
6271: **RECIBO DE PAGAMENTO**
6275: receiptValue()
6276: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
6277: atrasoDados()
6284: cobrarAtraso()
6300: allocatePix()
6319: reciboData()
6342: fmtDateTimeBR()
6343: reciboTexto()
6394: openRecibo()
6411: closeRecibo()
6412: **CORRIGIR RECIBO**
6414: corrigirLinhaHtml()
6424: openCorrigirRecibo()
6447: closeCorrigirRecibo()
6448: corrigirLer()
6454: corrigirSoma()
6461: salvarCorrigirRecibo()
6478: copyRecibo()
6483: reciboCanvas()
6500: reciboPdfBlob()
6518: shareReciboPdf()
6534: rotularTabelas()
6552: areaAberta()
6553: markAreas()
6563: closeAreas()
6567: toggleArea()
6575: dobraSalva()
6576: setDobra()
6581: toggleDobra()
6588: dobraTopo()
6595: renderMasterResumo()
6609: renderMasterTopo()
6631: loadIA()
6653: updateIABadge()
6658: loadIASetting()
6664: paintIASwitch()
6670: toggleIA()
6677: loadRobo()
6686: iaPrepararQr()
6691: paintRobo()
6720: pedirCodigoRobo()
6729: toggleRobo()
6744: iaTodosGerar()
6762: iaTodosCancelar()
6766: iaTodosConfirmar()
6780: loadIARules()
6785: iaAbrirPdf()
6791: renderIARules()
6795: saveIARules()
6800: addIARule()
6805: delIARule()
6809: openIA()
6824: closeIA()
6825: iaShow()
6826: iaPhone()
6831: renderIA()
6873: iaAprovar()
6882: iaPhone2()
6883: iaSend()
6914: iaMark()
6925: iaDelete()
6936: openPixArea()
6945: closePixArea()
6946: renderPixArea()
6982: openEditPix()
7011: deletePix()
7023: closeNewPix()
7025: saveNewPix()
7116: pushSupported()
7117: isIOS()
7118: isStandalone()
7119: b64ToBytes()
7125: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
7130: notifStatus()
7138: stepsList()
7142: notifHelpHtml()
7176: renderNotifModal()
7188: checkDriverNotifications()
7221: activateFromModal()
7234: refreshNotifButton()
7253: subscribePush()
7268: enableNotifications()
7288: closeDocViewer()
7296: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
7308: allFeaturesOn()
7309: feat()
7310: loadDriverFeatures()
7317: saveDriverFeatures()
7321: drawFeatureToggles()
7336: setAllFeatures()
7347: applyDriverFeatures()
7362: **PIX: conferência do código e QR code desenhado no aparelho**
7363: crc16()
7371: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
7373: pixTxt()
7374: pixCampo()
7375: pixGerarCodigo()
7385: pixAutoLigado()
7386: pixAutoMudou()
7391: gerarPixAuto()
7407: pixRecebedorCarregar()
7418: pixRecebedorGuardar()
7425: pixValid()
7431: renderPixQr()
7441: previewNewPixQr()
7451: **FOTO DO MOTORISTA (recortada da CNH)**
7452: photoPath()
7453: fileToCanvas()
7472: cropPhoto()
7486: savePhoto()
7491: photoBoxFrom()
7497: fillAvatar()
7508: fillAvatars()
7521: storedFile()
7528: photoFromCnh()
7540: **FOTO DO PERFIL ACOMPANHA A CNH**
7543: cnhStamp()
7544: photoFiles()
7552: avatarPath()
7557: syncCnhPhotos()
7581: pickImage()
7584: changeDriverPhoto()
7600: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
7602: uploadTmp()
7609: clearTmp()
7614: aiReadFiles()
7620: okDateISO()
7622: noAccents()
7624: makeUsername()
7633: titleCase()
7634: syncNewDriverAccess()
7640: setNewDriverPhoto()
7645: pickNewDriverPhoto()
7649: resetNewDriverForm()
7657: newDriverDocChosen()
7691: anoCrlv()
7692: aiReadCrlv()
7709: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
7710: sendWelcomeEmail()
7716: showCredentials()
7727: demoAssistente()
7746: **PERGUNTAR À IA (ÁREA IA, só o master)**
7750: iaChatReset()
7751: iaNorm()
7752: iaAcha()
7758: iaVeicTxt()
7759: iaCamposVeic()
7760: iaDataOk()
7761: iaOpcoes()
7762: iaTodosMotoristas()
7766: iaFerramenta()
7861: renderIAChat()
7878: iaChatDica()
7879: iaChatEnviar()
7914: iaChatNota()
7915: iaCancelarCartao()
7916: iaConfirmarCartao()
7959: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
7960: renderAppEarnings()
8040: saveAppEarning()
8066: workDayISO()
8067: paintDayOff()
8076: renderDayOff()
8083: setDayOff()
8093: aiReadEarning()
8126: **DESPESAS DO APLICATIVO**
8128: appExpCustomTypes()
8129: fillAppExpTypes()
8136: onAppExpTypeChange()
8141: saveAppExpense()
8165: deleteAppExpense()
8174: deleteAppEarning()
8271: loadTermsAcceptances()
8283: termsOf()
8284: currentAcceptance()
8285: needsTermsAcceptance()
8288: fmtDateTime()
8291: termsPlainText()
8295: termsHash()
8303: openTermsGate()
8326: termsGateCheck()
8334: acceptTerms()
8354: acceptanceHtml()
8365: openTermsViewer()
8383: closeTerms()
8389: downloadTermsCopy()
8410: termsBadgeMaster()
8417: termsMasterDetail()
8458: renderTermsSetupBanner()
8471: copyTermsSql()
8481: cnhExpired()
8482: cnhWaiting()
8483: onlyDigits()
8484: normName()
8486: verifyCnh()
8498: renderCnhBanner()
8516: sendNewCnh()
8564: cnhBadgeMaster()
8572: applyPendingCnh()
8580: autoReadNewCnhs()
8598: cnhPendingHtml()
8612: recheckPendingCnh()
8622: rejectPendingCnh()
8632: showContractDoc()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (518 linhas)

22: serviceKey()
29: json()
31: brl()
34: secret()
39: asaas()
52: avisar()
62: hojeBR()
63: proximoDia()
70: proximaParcela()
81: cauParcela()
90: ajusteVale()
93: tirarAjustes()
99: cobrarMotorista()
112: *valores (mesma regra do Novo Pix)*
140: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
143: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
164: r2()
166: criarQrAsaasEUpload()
189: saldoAbertoMotorista()
228: salvarQrParcialNoPerfil()
239: cobrarTodos()
259: *pagamento recebido*
260: quemPagou()
283: pagamentoRecebido()
349: usuarioAuth()
358: ehMaster()
363: pixParcialMotorista()
422: autorizarParcial()
463: preparar()
464: limpa()
499: acao "pix_parcial"
502: acao "autorizar_parcial"
507: acao "preparar"
511: acao "cobrar"

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (310 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
122: emAberto()
134: avisoAtraso()
152: **4) PIX AUTOMÁTICO DO MOTORA**
154: crc16()
159: campo()
160: txtPix()
161: codigoPix()
168: chaveNormal()
175: proximaParcela()
183: pixAutomatico()
190: *valores (mesma regra do Novo Pix e do Asaas)*
217: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
238: pixAutoTodos()
262: enviar()
271: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (442 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
